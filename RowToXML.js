const http = require('http');
const { DOMImplementation, XMLSerializer } = require('xmldom');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'Data');

const DataTypes = Object.freeze({
    Person: "P",
    Phone: 'T',
    Adress: 'A',
    Family: 'F',
  });

//Get data from URL
const GetDataFromUrl = ((url, callback) => { 
    http.get(url, (result) => {
        let data = [];
        result.on('data', (chunk) => {
            data += chunk;
        });

        result.on('end', () => {
            callback(null, data.split("\r\n"));
        });
        
    }).on('error', (error) => {
        callback(error.message, null);
    });
});

//Convert rows to people array
const RowConverter = ( (rows) => {
    let people = [];
    let person;
    let personFamily;
    
    rows.push("P||"); //Add last to array for stopping processing

    rows.forEach(rowItem => {
        let row = rowItem.split("|");
                
        if(row[0] == DataTypes.Person)
        {
            if(person) //New person push current to people
                people.push(person);

            person = {
                firstname: row[1] || "",
                lastname: row[2] || "",
                phone: [],
                adress: [],
                family: [],
            };
            personFamily = null;
        }else if(row[0] == DataTypes.Phone){
            let phoneNr = {
                mobile: row[1] || "",
                landline: row[2] || "",
            };

            if (personFamily) {
                personFamily.phone = personFamily.phone || [];
                personFamily.phone.push(phoneNr);
            } else if (person) {
                person.phone.push(phoneNr);
            }

        }else if(row[0] == DataTypes.Adress){
            let personAdress={
                street: row[1] || "",
                city: row[2] || "",
                zip: row[3] || "",
            }

            if(personFamily){
                personFamily.adress = personAdress;
            }else if(person){
                person.adress.push(personAdress);
            }

        }else if(row[0] == DataTypes.Family){
            personFamily = {
                name:row[1] || "",
                born:row[2] || "",
                Phone: [],
                adress: null,
            }
            if(personFamily) 
                person.family.push(personFamily);
        }
    });

    return people;
});

//Create XML with data
const CreateXML = ( (data) => {
    const people = RowConverter(data);
    const xml = new DOMImplementation().createDocument(null, "people", null);
    const element = xml.documentElement;

    people.forEach(person => {
        let personElement = xml.createElement("person");
        personElement.appendChild(createElementWithText(xml, "firstname", person.firstname));
        personElement.appendChild(createElementWithText(xml, "lastname", person.lastname));

        person.adress.forEach(ad =>{
            let adress = xml.createElement("adress");
            adress.appendChild(createElementWithText(xml, "city", ad.city));
            adress.appendChild(createElementWithText(xml, "street", ad.street));
            adress.appendChild(createElementWithText(xml, "zip", ad.zip));
            personElement.appendChild(adress);
        });

        person.phone.forEach(ph =>{
            let phone = xml.createElement("phone");
            phone.appendChild(createElementWithText(xml, "mobile", ph.mobile));
            phone.appendChild(createElementWithText(xml, "landline", ph.landline));
            personElement.appendChild(phone);
        });

        person.family.forEach(fam =>{
            let family = xml.createElement("family");
            family.appendChild(createElementWithText(xml, "name", fam.name));
            family.appendChild(createElementWithText(xml, "born", fam.born));
            
            if(fam.adress){
                let adress = xml.createElement("adress");
                adress.appendChild(createElementWithText(xml, "city", fam.adress.city));
                adress.appendChild(createElementWithText(xml, "street", fam.adress.street));
                adress.appendChild(createElementWithText(xml, "zip", fam.adress.zip));
                family.appendChild(adress);
            }

            if(fam.phone){
                fam.phone.forEach(f => {
                    let phone = xml.createElement("phone");
                    phone.appendChild(createElementWithText(xml, "mobile", f.mobile));
                    phone.appendChild(createElementWithText(xml, "landline", f.landline));
                    family.appendChild(phone);
                });
            }

            personElement.appendChild(family);
        });

        element.appendChild(personElement);
    });

    return xml;
});

//Create element by values
const createElementWithText = (doc, tagName, text) => {
    const element = doc.createElement(tagName);
    element.textContent = text;
    return element;
};

//Setup
const ServerSetup = http.createServer( (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        GetDataFromUrl('http://localhost:3000/data', async (error, data) => {
            if (error){
                console.error(error);
            }else{
                const xmlData = CreateXML(data || []);
                var serializer = new XMLSerializer();
                res.writeHead(200, { 'Content-Type': 'application/xml' });
                res.end(serializer.serializeToString(xmlData));
            }
        });
    } else if(req.url === '/data' && req.method === 'GET'){
        //In case this was external system it could be a file or URL
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    console.error('Error reading file:', err);
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data); 
                }
            });
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

//Run node server
ServerSetup.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
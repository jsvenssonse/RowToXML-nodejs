# RowToXML-nodejs
Convert Row data to XML

## Getting Started 

### Prerequirement
- Node installed

### Installation
1. Clone repository ```https://github.com/jsvenssonse/RowToXML-nodejs.git```
2. Install xmldom ```npm install xmldom```
3. Run ```node .\RowToXML.js```

## Geting Data 
 
 ### XML 
 - localhost:3000/

 ### Rows
- localhost:3000/data

### Row data explaination:
```
P|first name|last name
T|mobile number|landline number
A|street|city|postal code
F|name|year of birth
P can be followed by T, A, and F
F can be followed by T and A 
```

### The exampel data
```
P|Elof|Sundin
T|073-101801|018-101801
A|S:t Johannesgatan 16|Uppsala|75330
F|Hans|1967
A|Frodegatan 13B|Uppsala|75325
F|Anna|1969
T|073-101802|08-101802
P|Boris|Johnson
A|10 Downing Street|London
P|Sandy|Karlsson
T|072-201801|0454-321801
A|Kattgatan 1|Katt|56565
F|Kisse Mamma|2009
T|073-101802|08-101802
A|Kattgatan 1|Katt|56565
F|Kisse Pappa|2008
T|073-101802|08-101802
A|Kattgatan 1|Katt|56565
P|Abbe|Johnson
A|10 Burning Street|Hometown
```

### Result 
```
<people>
    <person>
        <firstname>Elof</firstname>
        <lastname>Sundin</lastname>
        <adress>
            <city>Uppsala</city>
            <street>S:t Johannesgatan 16</street>
            <zip>75330</zip>
        </adress>
        <phone>
            <mobile>073-101801</mobile>
            <landline>018-101801</landline>
        </phone>
        <family>
            <name>Hans</name>
            <born>1967</born>
            <adress>
                <city>Uppsala</city>
                <street>Frodegatan 13B</street>
                <zip>75325</zip>
            </adress>
            </family>
            <family>
                <name>Anna</name>
                <born>1969</born>
                <phone>
                <mobile>073-101802</mobile>
                <landline>08-101802</landline>
            </phone>
        </family>
    </person>
    <person>
        <firstname>Boris</firstname>
        <lastname>Johnson</lastname>
        <adress>
            <city>London</city>
            <street>10 Downing Street</street>
        <zip/>
        </adress>
    </person>
    <person>
        <firstname>Sandy</firstname>
        <lastname>Karlsson</lastname>
        <adress>
            <city>Katt</city>
            <street>Kattgatan 1</street>
            <zip>56565</zip>
        </adress>
        <phone>
            <mobile>072-201801</mobile>
            <landline>0454-321801</landline>
        </phone>
        <family>
            <name>Kisse Mamma</name>
            <born>2009</born>
            <adress>
                <city>Katt</city>
                <street>Kattgatan 1</street>
                <zip>56565</zip>
            </adress>
            <phone>
                <mobile>073-101802</mobile>
                <landline>08-101802</landline>
            </phone>
        </family>
        <family>
            <name>Kisse Pappa</name>
            <born>2008</born>
            <adress>
                <city>Katt</city>
                <street>Kattgatan 1</street>
                <zip>56565</zip>
            </adress>
            <phone>
                <mobile>073-101802</mobile>
                <landline>08-101802</landline>
            </phone>
        </family>
    </person>
    <person>
        <firstname>Abbe</firstname>
        <lastname>Johnson</lastname>
        <adress>
            <city>Hometown</city>
            <street>10 Burning Street</street>
            <zip/>
        </adress>
    </person>
</people>
```
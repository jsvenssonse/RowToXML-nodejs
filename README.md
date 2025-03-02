# RowToXML-nodejs
Convert Row data to XML


- Row data:

P|first name|last name
T|mobile number|landline number
A|street|city|postal code
F|name|year of birth
P can be followed by T, A, and F
F can be followed by T and A 

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

-Result 
```
<people>

    <person>

        <firstname>Elof</firstname>

        <lastname>Sundin</lastname>

        <address>

            <street>S:t Johannesgatan 16</street>

            <city>Uppsala</city>

            <zip>75330</zip>

        </address>

        <phone>

            <mobile>073-101801</mobile>

            <landline>018-101801</landline>

        </phone>

        <family>

            <name>Hans</name>

            <born>1967</born>

            <address>...</address>

        </family>

        <family>...</family>

    </person>

    <person>...</person>

</people>
```

## Getting Started 

### Prerequirement
- Node installed

### Installation
1. Clone repository
2. Install xmldom ```npm install xmldom```
3. Run ```node .\RowToXML.js```

## Geting Data 
 
 ### XML 
 - localhost:3000/

 ### Rows
- localhost:3000/data

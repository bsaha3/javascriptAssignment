var fs=require('fs');

var data = fs.readFileSync('../Production-Department_of_Agriculture_and_Cooperation_1.csv', {encoding:'utf8'}).toString();

var s=data.split("\r\n");

 var total=[];

 var j=0;

 for(var i=1;i<s.length;i++)
 {
     s[i]=s[i].replace("Annual,","Annual");
 }

 var particulars=[];
 var y2013=[];
 var j=0;
  for(var i=0;i<s.length-1;i++)
  {
    var line=s[i].split(",");

    particulars[j]=line[0];
    y2013[j]=line[line.length-2];

    j++;
  }

var oil=[];
j=0;
for(var i=0;i<particulars.length;i++)
{
  var line=particulars[i].split(" ");

  for(var k=0;k<line.length;k++)
  {
    if(line[k]=="Foodgrains")
    {
      break;
    }
    if(line[k]=="Oilseeds")
    {
      oil[j]=i;
      j++;
      break;
    }
  }

}

// console.log(oil);
var oilseed=[];
var year2013=[];
for(var i=0;i<oil.length-2;i++)
{
  if(i==0)
  {
    oilseed[i]=particulars[0];
    year2013[i]=y2013[0];
    continue;
  }
  oilseed[i]=particulars[oil[i]];
  year2013[i]=y2013[oil[i]];
}

var type=[];
var t="";
for(var i=1;i<oilseed.length;i++)
{
  t="";
  var line=oilseed[i].split(" ");

  for(var k=0;k<line.length;k++)
  {
    if(line[k]=="Agricultural" || line[k]=="Production" || line[k]=="Oilseeds")
    {
      continue;
    }
    t=t+line[k]+" ";
  }
   t=t.trim();
  type[i]=t;
}

// console.log(type);
type[0]="Oilseed type";

for(var i=1;i<year2013.length;i++)
{
  year2013[i]=parseFloat(year2013[i]);
}

var i, k, pos, temp;
        for (i = 0; i < year2013.length-1; i++)
        {
            pos = i;
            for (k = i+1; k < year2013.length; k++)
            {
                if (year2013[k] > year2013[pos])
                {
                    pos = k;
                }
            }
            /* Swap arr[i] and arr[pos] */
            temp = year2013[i];
            year2013[i] = year2013[pos];
            year2013[pos]= temp;

            temp=type[i];
            type[i]=type[pos];
            type[pos]=temp;
        }


var str="";
for(i=1;i<type.length;i++)
{
  if(i==1)
  {
    str=str+'[\n{\n"Oilseed crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n},\n\r';
    continue;
  }
  if(i==type.length-1)
  {
    str=str+'{\n"Oilseed crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n}\n]';
    continue;
  }
  str=str+'\n{\n"Oilseed crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n},\n\r';
}

fs.writeFileSync('oilseed.json',str);

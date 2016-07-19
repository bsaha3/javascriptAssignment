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

var food=[];
j=0;
for(var i=0;i<particulars.length;i++)
{
  var line=particulars[i].split(" ");

  for(var k=line.length-1;k>=0;k--)
  {
    if(line[k]=="Area" || line[k]=="Volume" || line[k]=="Yield" || line[k]=="Other" || line[k]=="Oilseeds" || line[k]=="Coarse" || line[k]=="Pulses" || line[k]=="Total")
    {
      break;
    }
    if(line[k]=="Foodgrains")
    {
      food[j]=i;
      j++;
      break;
    }
  }

}

// console.log(food);
var foodgrain=[];
var year2013=[];
for(var i=0;i<food.length-8;i++)
{
  if(i==0)
  {
    foodgrain[i]=particulars[0];
    year2013[i]=y2013[0];
    continue;
  }
  foodgrain[i]=particulars[food[i]];
  year2013[i]=y2013[food[i]];
}

// console.log(foodgrain);
// console.log(year2013);

var type=[];
var t="";
for(var i=1;i<foodgrain.length;i++)
{
  t="";
  var line=foodgrain[i].split(" ");

  for(var k=0;k<line.length;k++)
  {
    if(line[k]=="Agricultural" || line[k]=="Production" || line[k]=="Foodgrains")
    {
      continue;
    }
    t=t+line[k]+" ";
  }
   t=t.trim();
  type[i]=t;
}
type[0]="Foodgrain type";
// console.log(type);

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

// console.log(year2013);
// console.log(type);
var str="";
for(i=1;i<type.length;i++)
{
  if(i==1)
  {
    str=str+'[\n{\n"Foodgrain crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n},\n\r';
    continue;
  }
  if(i==type.length-1)
  {
    str=str+'{\n"Foodgrain crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n}\n]';
    continue;
  }
  str=str+'\n{\n"Foodgrain crop type" : "'+type[i]+'",\n"Production" : "'+year2013[i]+'"\n},\n\r';
}

fs.writeFileSync('foodgrain.json',str);

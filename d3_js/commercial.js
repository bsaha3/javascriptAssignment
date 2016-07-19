		var w = 1500,
		    h = 500,
		    mleft=20,
		    mtop=20,
		    mbottom=20
		    mright=20;

		var svg = d3.select("#chart")
			.append("svg")
			.attr("width", w + mleft + mright)
        	.attr("height", h + mtop + mbottom)
    		.append("g")
        	.attr("transform", "translate(" + mleft + "," + mtop + ")");

			d3.json("../json/Commercial.json", function(error, data){
				if(error)
				{
					throw error;
				}
				
				var max=d3.max(data, function(d){
					return +d["Agregated Value"];
				});
				console.log(Math.round(max));

				var y=d3.scaleLinear()
				.domain([0,Math.round(max)])
				.range([h,0]);

				var yAxis =d3.axisLeft()
				.scale(y);

				svg.append("g")
        		.attr("class", "y axis")
        		.style("fill", "black")
        		// .attr("transform", "translate(" + 20 + ",-20)")
        		.call(yAxis);	

        		var arr=[];
        		data.forEach(function(d){
        			arr.push(d["Year"]);
        		});

        		var x=d3.scaleBand()
				.domain(arr)
				.range([0, w])
				.padding(0.1)
				.align(0.5);
				// .paddingOuter(2)
				// .paddingInner(1);

				var xAxis =d3.axisBottom()
				.scale(x);

				svg.append("g")
        		.attr("class", "x axis")
        		.style("fill", "black")
        		.attr("transform", "translate("+0+"," + h + ")")
        		.call(xAxis)
        		.selectAll("text")
        		// .attr("transform","rotate(90)")
        		// .style("text-anchor","end")
        		.style("font-size","10")
        		.style("font-weight","bold");

        		var dataset=[];
        		data.forEach(function(d){
        			arr.push(d["Agregated Value"]);
        		});

        		svg.selectAll("rect")
        		.data(data)
        		.enter()
        		.append("rect")
        		// .attr("transform", "translate(" + 40 + ","+2+")")
        		.attr("x", function(d){return x(d["Year"]);})
				.attr("width",x.bandwidth())
				.attr("height",function(d){return h-y(d["Agregated Value"]);})
				.transition()
				.duration(200)
				.delay(function (d, i) {
					return i * 50;
				})
				.attr("y",function(d){return y(d["Agregated Value"]);})
				// .attr("fill","red")
				.attr("class","bar");

			});
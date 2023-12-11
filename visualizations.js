let line_f_clicked = false
let line_m_clicked = false

let point_f_q1_clicked = false
let point_f_q2_clicked = false
let point_f_q3_clicked = false
let point_f_q4_clicked = false
let point_m_q1_clicked = false
let point_m_q2_clicked = false
let point_m_q3_clicked = false
let point_m_q4_clicked = false

var tip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

d3.csv("Visualization1DataNew.csv").then(

    function(dataset){

       var dimensions = {
            width: 700,
            height: 350,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 50
            }
        }

        var svg = d3.select("#linechart")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, function(d){return +d.pctile}))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yMax = d3.max(dataset, function(d){
            var max = Math.max(+d.le_agg_F, +d.le_agg_M);
                return max
                }
        )
        
        var yMin = d3.min(dataset, function(d){
            var min = Math.min(+d.le_agg_F, +d.le_agg_M);
                return min
            }
        )
            
        var yScale = d3.scaleLinear()
                       .domain([yMin, yMax])
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        const line1 = d3.line()
                        .x(d => xScale(+d.pctile))
                        .y(d => yScale(+d.le_agg_F))

        const line2 = d3.line()
                        .x(d => xScale(+d.pctile))
                        .y(d => yScale(+d.le_agg_M))

        svg.append('rect')
          .attr("id", "highlight_q1")
          //.attr('fill', '#E5E4E2')
          .attr('fill', 'yellow')
          .attr('width', 146)
          .attr('height', 295)
          .attr("opacity", 0)
          .attr('x', 50)
          .attr('y', 9)

        svg.append('rect')
          .attr("id", "highlight_q2")
          //.attr('fill', '#E5E4E2')
          .attr('fill', 'yellow')
          .attr('width', 151)
          .attr('height', 295)
          .attr("opacity", 0)
          .attr('x', 196)
          .attr('y', 9)
        
        svg.append('rect')
          .attr("id", "highlight_q3")
          //.attr('fill', '#E5E4E2')
          .attr('fill', 'yellow')
          .attr('width', 151)
          .attr('height', 295)
          .attr("opacity", 0)
          .attr('x', 347)
          .attr('y', 9)
        
        svg.append('rect')
          .attr("id", "highlight_q4")
          //.attr('fill', '#E5E4E2')
          .attr('fill', 'yellow')
          .attr('width', 151)
          .attr('height', 295)
          .attr("opacity", 0)
          .attr('x', 498)
          .attr('y', 9)

        svg.append("g")
            .attr("transform", `translate(0,${dimensions.height - dimensions.margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(20).tickSizeOuter(0));
           
        svg.append("g")
           .attr("transform", `translate(${dimensions.margin.left},0)`)
           .call(d3.axisLeft(yScale).ticks(dimensions.height / 40))
           .call(g => g.selectAll(".tick line").clone()
               .attr("x2", dimensions.width - dimensions.margin.left - dimensions.margin.right)
               .attr("stroke-opacity", 0.1))
           .call(g => g.append("text")
               .attr("x", -dimensions.margin.left)
               .attr("y", 10)
               .attr("fill", "currentColor")
               .attr("text-anchor", "start"));

        const tooltip = d3.select("body")
                          .append("div")
                          .attr("class", "tooltip");

        svg.append("path")
            .attr("id", "line_f")
            .attr("fill", "none")
            .attr("stroke", "#FF7276")
            .attr("stroke-width", 1.5)
            .attr("d", line1(dataset))
            .on('mouseover', function(event, d){
              const xCoor = d3.pointer(event)[0];
              const [x, y] = d3.pointer(event)
              if (xCoor < 193)
              {
                tip.style("opacity", 1.0)
                 .html("Female Quartile 1")
                 .style("left", (x + 35) + "px")
                 .style("top", (y + 80) + "px")
              }
              else if (xCoor < 344 && xCoor >= 193)
              {
                tip.style("opacity", 1.0)
                .html("Female Quartile 2")
                .style("left", (x + 35) + "px")
                .style("top", (y + 80) + "px")
              }
              else if (xCoor < 497 && xCoor >= 344)
              {
                tip.style("opacity", 1.0)
                .html("Female Quartile 3")
                .style("left", (x + 35) + "px")
                .style("top", (y + 80) + "px")
              }
              else if (xCoor < 649 && xCoor >= 497)
              {
                tip.style("opacity", 1.0)
                 .html("Female Quartile 4")
                 .style("left", (x + 35) + "px")
                 .style("top", (y + 80) + "px")
              }

              d3.select(this)
                .style("stroke-width", 4.0)
               })

            .on('mouseout', function(d){
              tip.style("opacity", 0)

                if (line_f_clicked == false)
              {
                d3.select(this)
                .style("stroke-width", 1.5)
              }
            })
            .on('click', function(event, d){
              let gender = "F"
              const xCoor = d3.pointer(event)[0];

              line_f_clicked = true
              line_m_clicked = false

              update_map(xCoor, gender)
              updateScatterplotFromLineChart(xCoor, gender)

            d3.select(this)
              .style("stroke-width", 4.0)
            d3.select("#line_m")
              .style("stroke-width", 1.5)
            }
          )

        svg.append("path")
            .attr("id", "line_m")
            .attr("fill", "none")
            .attr("stroke", "#0096FF")
            .attr("stroke-width", 1.5)
            .attr("d", line2(dataset))
            .on('mouseover', function(d){
              const xCoor = d3.pointer(event)[0];
              const [x, y] = d3.pointer(event)
              if (xCoor < 193)
              {
                tip.style("opacity", 1.0)
                 .html("Male Quartile 1")
                 .style("left", (x + 35) + "px")
                 .style("top", (y + 80) + "px")
              }
              else if (xCoor < 344 && xCoor >= 193)
              {
                tip.style("opacity", 1.0)
                .html("Male Quartile 2")
                .style("left", (x + 35) + "px")
                .style("top", (y + 80) + "px")
              }
              else if (xCoor < 497 && xCoor >= 344)
              {
                tip.style("opacity", 1.0)
                .html("Male Quartile 3")
                .style("left", (x + 35) + "px")
                .style("top", (y + 80) + "px")
              }
              else if (xCoor < 649 && xCoor >= 497)
              {
                tip.style("opacity", 1.0)
                 .html("Male Quartile 4")
                 .style("left", (x + 35) + "px")
                 .style("top", (y + 80) + "px")
              }
                d3.select(this)
                  .style("stroke-width", 4.0)
               })
            .on('mouseout', function(d){
              tip.style("opacity", 0)
                 if (line_m_clicked == false)
              {
                d3.select(this)
                .style("stroke-width", 1.5)
              }
            })
            .on('click', function(event, d){
              let gender = "M"
              const xCoor = d3.pointer(event)[0];
              line_f_clicked = false
              line_m_clicked = true
            update_map(xCoor, gender)
            updateScatterplotFromLineChart(xCoor, gender)
            d3.select(this)
            .style("stroke-width", 4.0)
          d3.select("#line_f")
            .style("stroke-width", 1.5)
            })

            svg.append("text")
           .attr("class", "x label")
           .attr("text-anchor", "middle")
           .attr("x", dimensions.width - 350)
           .attr("y", dimensions.height - 10)
           .text("Income Percentile")
           .attr("fill", "maroon")

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", 10)
            .attr("x", -150)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Average Lifespan [years]")
            .attr("fill", "maroon");

          svg.selectAll(".vertical-line")
            .data([25, 50, 75, 100])
            .enter().append("line")
            .attr("class", "vertical-line")
            .attr("x1", d => xScale(d))
            .attr("y1", dimensions.margin.top)
            .attr("x2", d => xScale(d))
            .attr("y2", dimensions.height - dimensions.margin.bottom)
            .attr("stroke", "gray")
            .attr("stroke-opacity", .3);

  var legend = svg.append("g")
              .attr("class", "legend")
              .attr("transform", "translate(" + (dimensions.width - 630) + "," + 30 + ")");

          legend.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", "#FF7276"); 

          legend.append("rect")
              .attr("x", 0)
              .attr("y", 30)
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", "#0096FF"); 

          legend.append("text")
              .attr("x", 25)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "start")
              .text("Female");

          legend.append("text")
              .attr("x", 25)
              .attr("y", 39)
              .attr("dy", ".35em")
              .style("text-anchor", "start")
              .text("Male");
  }  
)

d3.csv("Visualization2Data.csv").then(

    function(dataset){
       var dimensions = {
            width: 1400,
            height: 400,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 50
            }
        }

        var yAccessor = d => +d.le_agg_slope_q1_F
        var yAccessor1 = d => +d.le_agg_slope_q2_F
        var yAccessor2 = d => +d.le_agg_slope_q3_F
        var yAccessor3 = d => +d.le_agg_slope_q4_F
        var yAccessor4 = d => +d.le_agg_slope_q1_M
        var yAccessor5 = d => +d.le_agg_slope_q2_M
        var yAccessor6 = d => +d.le_agg_slope_q3_M
        var yAccessor7 = d => +d.le_agg_slope_q4_M

        var svg = d3.select("#scatterplot")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)    

      var yMax = d3.max(dataset, function(d){
            var max = Math.max(+d.le_agg_slope_q1_F, +d.le_agg_slope_q2_F, +d.le_agg_slope_q3_F, +d.le_agg_slope_q4_F,
                +d.le_agg_slope_q1_M, +d.le_agg_slope_q2_M, +d.le_agg_slope_q3_M, +d.le_agg_slope_q4_M);

                return max
            }
        )
    
        console.log(yMax)
        
        var yMin = d3.min(dataset, function(d){
           var min = Math.min(+d.le_agg_slope_q1_F, +d.le_agg_slope_q2_F, +d.le_agg_slope_q3_F, +d.le_agg_slope_q4_F,
                +d.le_agg_slope_q1_M, +d.le_agg_slope_q2_M, +d.le_agg_slope_q3_M, +d.le_agg_slope_q4_M);

                return min
            }
        )

        var xScale = d3.scaleBand()
                       .domain(d3.map(dataset, d => d.stateabbrv))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


        var yScale = d3.scaleLinear()
                       .domain([yMin, yMax])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
                                
        var f_q1 = svg.append("g")
                      .attr("id", "point_f_q1")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor(d)))
                      .attr("r", 4)
                      .attr("fill", "#FF7276")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Female Quartile 1" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q1_F))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)

                        if (point_f_q1_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_m_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            //console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'F'
                        quartile = 1
                        updateLineChartFromScatterPlot(gender, quartile)

                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

       var f_q2 = svg.append("g")
                      .attr("id", "point_f_q2")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor1(d)))
                      .attr("r", 4)
                      .attr("fill", "#FF7276")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Female Quartile 2" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q2_F))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_f_q2_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_m_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'F'
                        quartile = 2
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var f_q3 = svg.append("g")
                      .attr("id", "point_f_q3")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor2(d)))
                      .attr("r", 4)
                      .attr("fill", "#FF7276")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Female Quartile 3" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q3_F))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_f_q3_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_m_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'F'
                        quartile = 3
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var f_q4 = svg.append("g")
                      .attr("id", "point_f_q4")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor3(d)))
                      .attr("r", 4)
                      .attr("fill", "#FF7276")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Female Quartile 4" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q4_F))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_f_q4_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_m_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'F'
                        quartile = 4
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var m_q1 = svg.append("g")
                      .attr("id", "point_m_q1")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor4(d)))
                      .attr("r", 4)
                      .attr("fill", "#0096FF")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Male Quartile 1" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q1_M))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_m_q1_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_f_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'M'
                        quartile = 1
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var m_q2 = svg.append("g")
                      .attr("id", "point_m_q2")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor5(d)))
                      .attr("r", 4)
                      .attr("fill", "#0096FF")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Male Quartile 2" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q2_M))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_m_q2_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_f_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'M'
                        quartile = 2
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var m_q3 = svg.append("g")
                      .attr("id", "point_m_q3")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor6(d)))
                      .attr("r", 4)
                      .attr("fill", "#0096FF")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Male Quartile 3" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q3_M))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_m_q3_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_f_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'M'
                        quartile = 3
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var m_q4 = svg.append("g")
                      .attr("id", "point_m_q4")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor7(d)))
                      .attr("r", 4)
                      .attr("fill", "#0096FF")
                      .attr("stroke", "#36454F")
                      .style("stroke-width", 0.25)
                      .style("transform", "translateX(13px)")
                      .on('mouseover', function(event, d){
                        const [x, y] = d3.pointer(event)
                        tip.style("opacity", 1.0)
                          .html(d.statename + " Male Quartile 4" + "<br/> Change in Life Expectancy: " + d3.format("0.3f")(d.le_agg_slope_q4_M))
                          .style("left", (x + 40) + "px")
                          .style("top", (y + 400) + "px")

                        d3.select(this)
                          .attr("stroke", "#36454F")
                          .attr("r", 5.5)
                          .style("stroke-width", "1.5")
                       })
                       .on('mouseout', function(d){
                        tip.style("opacity", 0)
                        if (point_m_q4_clicked == false)
                        {
                          d3.select(this)
                          .attr("stroke", "#36454F")
                          .style("stroke-width", 0.25)
                          .attr("r", 4)
                        }
                        if (line_f_clicked == true)
                        { d3.select(this)
                            .attr("stroke", "white")
                            console.log("working")
                        }
                       })
                       .on('click', function(event, d){
                        gender = 'M'
                        quartile = 4
                        updateLineChartFromScatterPlot(gender, quartile)
                        var stateAbbreviation = d.stateabbrv;

                        if (stateAbbreviation) {
                            highlightState(stateAbbreviation, dataset);
                        }
                       })

        var xAxisGen = d3.axisBottom().scale(xScale)

        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${(dimensions.height-150)}px)`)
    

        var yAxisGen = d3.axisLeft().scale(yScale)

        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)

        svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", dimensions.width / 2)
        .attr("y", dimensions.height -40)
        .text("State Abbreviation")
        .attr("fill", "maroon")

      svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "middle")
          .attr("y", 10)
          .attr("x", -150)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Change in Life Expectancy")
          .attr("fill", "maroon")
    
      var legendScatterplot = svg.append("g")
                                .attr("class", "legend")
                                .attr("transform", "translate(" + (dimensions.width - 1330) + "," + 30 + ")");

      legendScatterplot.append("rect")
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("width", 18)
                      .attr("height", 18)
                      .attr("fill", "#FF7276"); 

      legendScatterplot.append("rect")
                      .attr("x", 0)
                      .attr("y", 30)
                      .attr("width", 18)
                      .attr("height", 18)
                      .attr("fill", "#0096FF");

      legendScatterplot.append("text")
                      .attr("x", 25)
                      .attr("y", 9)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .text("Female");

      legendScatterplot.append("text")
                      .attr("x", 25)
                      .attr("y", 39)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .text("Male");  
    }  
)

d3.csv("Visualization3Data.csv").then(

    function(dataset){

        d3.json("us_states.json").then(function(mapdata){

            var state_le = {}
            dataset.forEach(d => 
                {state_le[d["statename"]] = +d["combined_le_FM"]})

            var w = 700;
            var h = 350;

            var svg = d3.select("#map")
                        .attr("width", w)
                        .attr("height", h)
    
            var projection = d3.geoAlbersUsa()  
                               .translate([w/3 , h/2])
                               .scale([w]);  
            
            var path = d3.geoPath().projection(projection);

            var colorScale = d3.scaleLinear()
                               .domain([d3.min(Object.values(state_le)), d3.max(Object.values(state_le))])
                               .range(["lightgreen", "#355E3B"])

            var colorLegend = d3.legendColor()
                                .labelFormat(d3.format(".1f"))
                                .scale(colorScale)
                                .shapePadding(0)
                                .shapeWidth(50)
                                .shapeHeight(20)
                                .labelOffset(12);
             svg.append("g")
                .attr("transform", "translate(15, 50)")
                .call(colorLegend)
                .append("text")
                .attr("x", -15)
                .attr("y", -20)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text("Average Life Expectancy")  

            var mapGroup = svg.append("g")
                              .attr("transform", "translate(" + w / 4 + "," + h / 300 + ")");

            var selectedState = null;

          
            
            var states = mapGroup.selectAll(".state")
                               .data(mapdata.features)
                               .enter()
                               .append("path")
                               .attr("class", "state")
                               .attr("d", d => path(d))
                               .attr("fill", d => colorScale(+state_le[d.properties.NAME]))
                               .attr("stroke", "black")
                               .style("stroke-width", 0.3)
                               .attr("stateNameAttr", d => d.properties.NAME)
                               .on('mouseover', function(event, d){
                                const [x, y] = d3.pointer(event)
                                tip.style("opacity", 1.0)
                                  .html("State: " + d3.select(this).attr("stateNameAttr") + "<br/> Life Expectancy: " + d3.format(".1f")(state_le[d3.select(this).attr("stateNameAttr")]))
                                  .style("left", (x + 725) + "px")
                                  .style("top", (y + 75) + "px")        

                                if (selectedState !== d3.select(this).attr("stateNameAttr")) {
                                  d3.select(this)
                                      .attr("stroke", "black")
                                      .style("stroke-width", 2.0);
                              }
                               })
                               .on('mouseout', function(d){
                                tip.style("opacity", 0)
                                if (selectedState !== d3.select(this).attr("stateNameAttr")) {
                                  d3.select(this)
                                      .attr("stroke", "black")
                                      .style("stroke-width", 0.3);
                              }
                               })
                               .on('click', function(d){
                                var stateName = d3.select(this).attr("stateNameAttr");

                                if (selectedState !== null) {
                                    var previousState = d3.select(`[stateNameAttr="${selectedState}"]`);
                                    previousState.attr("stroke", "black").style("stroke-width", 0.3);
                                }

                                selectedState = stateName;
                              function updateScatterplotFromMap(stateName) {
                                  var filteredData = dataset.filter(d => d["statename"] === stateName);
                                    console.log("Filtered Data:", filteredData);

                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .attr("fill-opacity", 0)
                                        .attr("stroke-opacity", 0)

                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .filter(function (d) {
                                            return d.statename === stateName;
                                        })
                                        .attr("fill-opacity", 1)
                                        .attr("stroke-opacity", 1)
                              }

                              console.log("u clicked on:", stateName);
                              updateScatterplotFromMap(stateName);

                              d3.select(this)
                                  .attr("stroke", "yellow")
                                  .style("stroke-width", 2.0);

                              d3.select("#DC")
              .on('mouseover', function(event, d){
                d3.select(this).attr("stateNameAttr", "District Of Columbia")
                const [x, y] = d3.pointer(event)
                tip.style("opacity", 1.0)
                  .html("State: " + d3.select(this).attr("stateNameAttr") + "<br/> Life Expectancy: " + d3.format(".1f")(state_le[d3.select(this).attr("stateNameAttr")]))
                  .style("left", (x + 1250) + "px")
                  .style("top", (y + 250) + "px")     
              })   
              .on('mouseout', function(event, d){
                tip.style("opacity", 0)
              })          
              .on('click', function(){
                stateName = "District Of Columbia";
                updateScatterplotFromMap(stateName);})  

            })

                               function updateScatterplotFromDC(stateName) {
                                stateName = "District Of Columbia";
              var filteredData = dataset.filter(d => d["statename"] === stateName);
                                    console.log("Filtered Data:", filteredData);

                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .attr("fill-opacity", 0)
                                        .attr("stroke-opacity", 0)


                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .filter(function (d) {
                                            return d.statename === stateName;
                                        })
                                        .attr("fill-opacity", 1)
                                        .attr("stroke-opacity", 1)
              }
            
              d3.select("#DC")
              .on('mouseover', function(event, d){
                d3.select(this).attr("stateNameAttr", "District Of Columbia")
                const [x, y] = d3.pointer(event)
                tip.style("opacity", 1.0)
                  .html("State: " + d3.select(this).attr("stateNameAttr") + "<br/> Life Expectancy: " + d3.format(".1f")(state_le[d3.select(this).attr("stateNameAttr")]))
                  .style("left", (x + 1250) + "px")
                  .style("top", (y + 250) + "px")     
              })   
              .on('mouseout', function(event, d){
                tip.style("opacity", 0)
              })          
              .on('click', function(){
                stateName = "District Of Columbia";
                updateScatterplotFromDC(stateName);})    
        })
    }  
)


function update_map(xCoor, gender){

  d3.selectAll(".state").remove()
  
  d3.csv("Visualization3Data.csv").then(
  
    function(dataset){
  
      var state_le = {}

        d3.json("us_states.json").then(function(mapdata){
          var titleText = "Life Expectancy by State";

          if (gender == "F"){
            if (xCoor < 193) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q1_F"]}) 

            titleText = "Life Expectancy for Q1 in Females";
            }
            else if (xCoor < 344 && xCoor >= 193) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q2_F"]}) 

            titleText = "Life Expectancy for Q2 in Females";
            }
            else if (xCoor < 497 && xCoor >= 344) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q3_F"]}) 

            titleText = "Life Expectancy for Q3 in Females";
            }
            else if (xCoor < 649 && xCoor >= 497) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q4_F"]}) 

            titleText = "Life Expectancy for Q4 in Females";
            }
          }

          if (gender == "M"){
            if (xCoor < 193) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q1_M"]}) 

            titleText = "Life Expectancy for Q1 in Males";
            }
            else if (xCoor < 344 && xCoor >= 193) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q2_M"]}) 

            titleText = "Life Expectancy for Q2 in Males";
            }
            else if (xCoor < 497 && xCoor >= 344) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q3_M"]}) 

            titleText = "Life Expectancy for Q3 in Males";
            }
            else if (xCoor < 649 && xCoor >= 497) {
              dataset.forEach(d => 
                {state_le[d["statename"]] = +d["le_agg_q4_M"]}) 

            titleText = "Life Expectancy for Q4 in Males";
            }
          }

           d3.select("#map-title")
            .text(titleText);
  
            var w = 700;
            var h = 350;

            var svg = d3.select("#map")
                        .attr("width", w)
                        .attr("height", h)
    
            var projection = d3.geoAlbersUsa()  
                               .translate([w/3 , h/2])
                               .scale([w]);  
            
            var path = d3.geoPath().projection(projection);

            if (gender == "F"){
              var colorScale = d3.scaleLinear()
                                 .domain([d3.min(Object.values(state_le)), d3.max(Object.values(state_le))])
                                 .range(["#fae7e8", "red"])
            }

            if (gender == "M"){
              var colorScale = d3.scaleLinear()
                                 .domain([d3.min(Object.values(state_le)), d3.max(Object.values(state_le))])
                                 .range(["lightblue", "blue"])
            }

            svg.append('rect')
               .attr('x', 0)
               .attr('y', 40)
               .attr('width', 120)
               .attr('height', 200)
               .attr('fill', 'white');

            var colorLegend = d3.legendColor()
                                .labelFormat(d3.format(".1f"))
                                .scale(colorScale)
                                .shapePadding(0)
                                .shapeWidth(50)
                                .shapeHeight(20)
                                .labelOffset(12);
             svg.append("g")
                .attr("transform", "translate(15, 50)")
                .call(colorLegend)
                .append("text")
                .attr("x", -15)
                .attr("y", -20)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text("Average Life Expectancy")  

            var mapGroup = svg.append("g")
                              .attr("transform", "translate(" + w / 4 + "," + h / 300 + ")");

            var selectedState = null;

          
            
            var states = mapGroup.selectAll(".state")
                               .data(mapdata.features)
                               .enter()
                               .append("path")
                               .attr("class", "state")
                               .attr("d", d => path(d))
                               .attr("fill", d => colorScale(+state_le[d.properties.NAME]))
                               .attr("stroke", "black")
                               .style("stroke-width", 0.3)
                               .attr("stateNameAttr", d => d.properties.NAME)
                               .on('mouseover', function(event, d){
                                const [x, y] = d3.pointer(event)
                                tip.style("opacity", 1.0)
                                  .html("State: " + d3.select(this).attr("stateNameAttr") + "<br/> Life Expectancy: " + d3.format(".1f")(state_le[d3.select(this).attr("stateNameAttr")]))
                                  .style("left", (x + 725) + "px")
                                  .style("top", (y + 75) + "px")        

                                if (selectedState !== d3.select(this).attr("stateNameAttr")) {
                                  d3.select(this)
                                      .attr("stroke", "black")
                                      .style("stroke-width", 2.0);
                              }
                               })
                               .on('mouseout', function(d){
                                tip.style("opacity", 0)
                                if (selectedState !== d3.select(this).attr("stateNameAttr")) {
                                  d3.select(this)
                                      .attr("stroke", "black")
                                      .style("stroke-width", 0.3);
                              }
                               })
                               .on('click', function(d){
                                var stateName = d3.select(this).attr("stateNameAttr");

                                if (selectedState !== null) {
                                    var previousState = d3.select(`[stateNameAttr="${selectedState}"]`);
                                    previousState.attr("stroke", "black").style("stroke-width", 0.3);
                                }

                                selectedState = stateName;
                              function updateScatterplotFromMap(stateName) {
                                  var filteredData = dataset.filter(d => d["statename"] === stateName);
                                    console.log("Filtered Data:", filteredData);

                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .attr("fill-opacity", 0)
                                        .attr("stroke-opacity", 0)

                                    d3.select("#scatterplot")
                                        .selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4, #point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
                                        .selectAll("circle")
                                        .filter(function (d) {
                                            return d.statename === stateName;
                                        })
                                        .attr("fill-opacity", 1)
                                        .attr("stroke-opacity", 1)
                              }

                              console.log("u clicked on:", stateName);
                              updateScatterplotFromMap(stateName);

                              d3.select(this)
                                  .attr("stroke", "yellow")
                                  .style("stroke-width", 2.0);

                              d3.select("#DC")
              .on('mouseover', function(event, d){
                d3.select(this).attr("stateNameAttr", "District Of Columbia")
                const [x, y] = d3.pointer(event)
                tip.style("opacity", 1.0)
                  .html("State: " + d3.select(this).attr("stateNameAttr") + "<br/> Life Expectancy: " + d3.format(".1f")(state_le[d3.select(this).attr("stateNameAttr")]))
                  .style("left", (x + 1250) + "px")
                  .style("top", (y + 250) + "px")     
              })   
              .on('mouseout', function(event, d){
                tip.style("opacity", 0)
              })          
              .on('click', function(){
                stateName = "District Of Columbia";
                updateScatterplotFromMap(stateName);}) 
          })
        })
    }  
  )
  }

  function updateScatterplotFromLineChart(xCoor, gender){
    console.log(xCoor)
     d3.selectAll("circle")
        .attr("stroke", null)  
        .attr("r", 4)        
        .style("stroke-width", 0.25)

         if (gender == "F"){
            d3.selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4")
              .attr("fill-opacity", ".15")

              d3.selectAll("#point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
              .attr("fill-opacity", "1")

            point_m_q1_clicked = false
            point_m_q2_clicked = false
            point_m_q3_clicked = false
            point_m_q4_clicked = false

            if (xCoor < 193) {
              
              d3.select("#point_f_q1")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q1")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)

              point_f_q1_clicked = true
             
              point_f_q2_clicked = false
              point_f_q3_clicked = false
              point_f_q4_clicked = false

            }
            else if (xCoor < 344 && xCoor >= 193) {
              d3.select("#point_f_q2")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q2")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q1, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)
              
                point_f_q2_clicked = true

                point_f_q1_clicked = false
                point_f_q3_clicked = false
                point_f_q4_clicked = false
               
            }
            else if (xCoor < 497 && xCoor >= 344) {
              d3.select("#point_f_q3")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q3")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q1, #highlight_q4")
                .attr("opacity", 0)
              
              point_f_q3_clicked = true

              point_f_q1_clicked = false
              point_f_q2_clicked = false
              point_f_q4_clicked = false
            }
            else if (xCoor < 649 && xCoor >= 497) {
              d3.select("#point_f_q4")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q4")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q1")
                .attr("opacity", 0)
          
                point_f_q4_clicked = true

                point_f_q1_clicked = false
                point_f_q2_clicked = false
                point_f_q3_clicked = false
            }
          }

          if (gender == "M"){
            d3.selectAll("#point_f_q1, #point_f_q2, #point_f_q3, #point_f_q4")
              .attr("fill-opacity", ".15")

            d3.selectAll("#point_m_q1, #point_m_q2, #point_m_q3, #point_m_q4")
              .attr("fill-opacity", "1")

            point_f_q1_clicked = false
            point_f_q2_clicked = false
            point_f_q3_clicked = false
            point_f_q4_clicked = false

            if (xCoor < 193) {
                d3.select("#point_m_q1")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q1")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)
       
                point_m_q1_clicked = true

                point_m_q2_clicked = false
                point_m_q3_clicked = false
                point_m_q4_clicked = false
            }
            else if (xCoor < 344 && xCoor >= 193) {
              d3.select("#point_m_q2")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q2")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q1, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)
            
                point_m_q2_clicked = true

                point_m_q1_clicked = false
                point_m_q3_clicked = false
                point_m_q4_clicked = false
            }
            else if (xCoor < 497 && xCoor >= 344) {
              d3.select("#point_m_q3")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q3")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q4, #highlight_q1")
                .attr("opacity", 0)

                point_m_q3_clicked = true

                point_m_q1_clicked = false
                point_m_q2_clicked = false
                point_m_q4_clicked = false
            }
            else if (xCoor < 649 && xCoor >= 497) {
              d3.select("#point_m_q4")
                .selectAll("circle")
                .attr("stroke", "#36454F")
                .attr("r", 5.5)
                .style("stroke-width", "1.5")

              d3.select("#highlight_q4")
                .attr("opacity", 0.25)
              d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q1")
                .attr("opacity", 0)
      
                point_m_q4_clicked = true

                point_m_q1_clicked = false
                point_m_q2_clicked = false
                point_m_q3_clicked = false
            }
          }
  }

  function updateLineChartFromScatterPlot(gender, quartile){
    if (gender == 'F'){
      d3.select("#line_f")
        .style("stroke-width", 4.0)
      
      d3.select("#line_m")
        .style("stroke-width", 1.5)
      if (quartile == 1)
      {
        d3.select("#highlight_q1")
          .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q4")
          .attr("opacity", 0)
      }
      if (quartile == 2)
      {
        d3.select("#highlight_q2")
                .attr("opacity", 0.25)
        d3.selectAll("#highlight_q1, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)
      }
      if (quartile == 3)
      {
        d3.select("#highlight_q3")
                .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q4, #highlight_q1")
                .attr("opacity", 0)
      }
      if (quartile == 4)
      {
        d3.select("#highlight_q4")
          .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q1")
          .attr("opacity", 0)
      }

    }

    if (gender == 'M'){
      d3.select("#line_m")
        .style("stroke-width", 4.0)

      d3.select("#line_f")
        .style("stroke-width", 1.5)
      if (quartile == 1)
      {
        d3.select("#highlight_q1")
          .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q4")
          .attr("opacity", 0)
      }
      if (quartile == 2)
      {
        d3.select("#highlight_q2")
                .attr("opacity", 0.25)
        d3.selectAll("#highlight_q1, #highlight_q3, #highlight_q4")
                .attr("opacity", 0)
      }
      if (quartile == 3)
      {
        d3.select("#highlight_q3")
          .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q4, #highlight_q1")
          .attr("opacity", 0)
      }
      if (quartile == 4)
      {
        d3.select("#highlight_q4")
          .attr("opacity", 0.25)
        d3.selectAll("#highlight_q2, #highlight_q3, #highlight_q1")
          .attr("opacity", 0)
      }
    }
  }

var selectedState = null; 

function highlightState(stateAbbreviation, dataset) {
    
    var stateData = dataset.find(d => d["stateabbrv"] === stateAbbreviation);

    var stateName = stateData["statename"];

    if (selectedState !== null) {
        var previousState = d3.select(`[stateNameAttr="${selectedState}"]`);
        previousState.attr("stroke", "black").style("stroke-width", 0.3);
    }

    var currentState = d3.select(`[stateNameAttr="${stateName}"]`);
    currentState.attr("stroke", "yellow").style("stroke-width", 4.0);//.raise();
    //currentState.raise();

    selectedState = stateName;
}
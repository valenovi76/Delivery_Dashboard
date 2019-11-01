//load data
queue()
.defer(d3.csv, "/data/orders.csv")
.await(makeGraphs);

//Cards values
var CurrentRFTPerf = 0;
for(var i = 0; i < Completed_Month.length; ++i){
    if(array[i] == "OnTime")
        count++;
}
console.log(CurrentCTPerf);

//var CurrentCTPerf =
//var CurrentDelivered =

// Make graphs function
function makeGraphs(error, orderData) {

    var ndx = crossfilter(orderData);


orderData.forEach(function(d){
d.CT_Ex_Delayed_Days=parseInt(d.CT_Ex_Delayed_Days)})




    show_wip_group_selector(ndx);
    show_product_selector(ndx);
    show_project_selector(ndx);
    show_created(ndx);
    show_completed(ndx);
    show_order_order_type(ndx);
    show_ct_avg(ndx);
    show_ontime_late(ndx);
    //show_order_type(ndx);


    dc.renderAll();
}


//Selector js
function show_wip_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Channel'));
    var group = dim.group();
    var select = dc.selectMenu("#wip_group_selector")
        .dimension(dim)
        .group(group);

}
function show_product_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Product'));
    var group = dim.group();
    var select = dc.selectMenu("#product_selector")
        .dimension(dim)
        .group(group);

}
function show_project_selector(ndx){
    var dim=ndx.dimension(dc.pluck('Project'));
    var group= dim.group();
    var select = dc.selectMenu("#project_selector")
        .dimension(dim)
        .group(group);

}

//created line js
function show_created(ndx) {
var dim = ndx.dimension(dc.pluck('Created_Month'));
var group =dim.group();

dc.lineChart("#created")
.width(400)
.height(300)
.margins({top: 30, right: 40, bottom: 50, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//completed line js
function show_completed(ndx) {
var dim = ndx.dimension(dc.pluck('Completed_Month'));
var group = dim.group();

dc.lineChart("#completed")

.width(400)
.height(300)
.margins({top: 30, right: 40, bottom: 50, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//WIP pie js
function show_order_order_type(ndx) {
    var dim = ndx.dimension(dc.pluck('Order_Type'));
    var group = dim.group();


    dc.pieChart("#order_type")

        .width(400)
        .height(300)
        .slicesCap(4)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .legend(dc.legend())

}
//CT Avg line js
function show_ct_avg(ndx){
var dim = ndx.dimension(dc.pluck("Completed_Month"));

function add_item(p,v){
p.count ++;
p.total += v.CT_Ex_Delayed_Days;
p.average = p.total/p.count;
return p;
}
function remove_item(p,v){
p.count--;
if(p.count==0){
p.total=0;
p.average=0;}else{
p.total -= v.CT_Ex_Delayed_Days;
p.average = p.total/p.count;
}
return p;
}
function initialise(){
    return{count:0, total:0, average:0};
}


var group= dim.group().reduce(add_item,remove_item,initialise);


dc.lineChart("#ct_avg")
.width(400)
.height(300)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(dim)
.group(group)
.valueAccessor(function(d){
return d.value.average})
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);

}
//CT perf js

//OnTime vs Late js

   function show_ontime_late(ndx){
    var dim = ndx.dimension(dc.pluck('On_Time'));
    var group = dim.group();

    dc.barChart("#ontime_perf")
    .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("RFTPerf")
        .yAxis().ticks(20);
   }
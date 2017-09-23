<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<script type="text/javascript">
		'use strict'
		/**
		 *  JS 省份、城市、城镇插件
		 * @class      Dropdownlist (name)
		 * @return     {Object}  { description_of_the_return_value }
		 */
		var Dropdownlist = (function(){	

			/*获取组件*/
			var $ = function(id){
				return document.getElementById(id);
			};

			/*触发组件事件*/
			var eveoptions ={
					provinceEvents:function(e){},
					cityEvents:function(e){},
					townEvents:function(e){},
			};

			/*初始化一些数据选项*/
			var options = {
					//省份数据
					provinceitems:[{"name":"浙江","id":1},{"name":"湖北","id":2}],
					//城市数据
					cityitems:[
						{
							"provinceid":1,
							"subitems":[{"name":"温州","id":123},{"name":"绍兴","id":124}]
						},
						{
							"provinceid":2,
							"subitems":[{"name":"武汉","id":125},{"name":"宜昌","id":126}]
						}],
					//城镇数据
					townitems:[
						{
							"provinceid":1,
						 	"towns":[
								 {"cityid":123,"subitems":[{"name":"乐清","id":1231},{"name":"瓯海","id":1232}]},
							 	 {"cityid":124,"subitems":[{"name":"越城","id":1241},{"name":"上虞","id":1242}]},
								]
						},
						{
							"provinceid":2,
							"towns":[
								 {"cityid":125,"subitems":[{"name":"汉口","id":1251},{"name":"武昌","id":1252}]},
								 {"cityid":126,"subitems":[{"name":"当阳","id":1261},{"name":"枝江","id":1262}]},
								]
						}
					]	
			};
			/**
			 * 添加1个下拉选项
			 * @param      {<type>}  obj     对象
			 * @param      {<type>}  text    文本
			 * @param      {<type>}  value   值
			 */
			var addOptions = function(obj,text,value){
				$(obj).options.add(new Option(text,value));
			};
			/**
			 * 将1个对象数据绑定到下拉框
			 * @param      {<type>}  items   数据
			 * @param      {<type>}  id      下拉框ID
			 */
			var getOptions= function(items,id){
				items.forEach(function(value,index){
					addOptions(id,value.name,value.id);
				});
			};

			/**
			 * 加载城市数据
			 * @param      {<type>}  provinceid  省份ID
			 * @param      {<type>}  city        城市下拉框
			 */
			var loadCityData  = function(provinceid,city,town,cityEvents,townEvents){
				var citydata = options.cityitems.find(function(model){
					return model.provinceid ==provinceid;
				});
				if(citydata){

					$(city).options.length=0;
					$(town).options.length=0;

					getOptions(citydata.subitems,city);

					$(city).onchange= function(){
						loadTownData(provinceid,this.value,town,townEvents);
						cityEvents&&cityEvents(this);
					};
				};
			};
			/**
			 * 加载城镇数据
			 * @param      {<type>}  provinceid  省份ID
			 * @param      {<type>}  cityid 	 城市ID
			 * @param      {<type>}  town    	 城镇下拉框
			 */
			var loadTownData = function(provinceid,cityid,town,townEvents){
				var towndata  = options.townitems.find(function(model){
					return  model.provinceid==provinceid;
				});
				if(towndata){
					towndata = towndata.towns.find(function(model){
						return model.cityid==cityid;
					});
					if(towndata){
						$(town).options.length=0;
						getOptions(towndata.subitems,town);
						$(town).onchange = function(){
							townEvents&&townEvents(this);
						};
					}
				}
			};
			/**
			 * { function_description }
			 * @param      {<type>}  province  省份ID
			 * @param      {<type>}  city      城市ID
			 */
			var binds = function(province,city,town,provinceEvents,cityEvents,townEvents){
				if(!$(province)){
					console.log('province:组件未找到');
					return;
				}
				if(!$(city)){
					console.log('city:组件未找到');
					return;
				}
				if(!$(town)){
					console.log('town:组件未找到');
					return;
				}
				getOptions(options.provinceitems,province);
				$(province).onchange = function(){
					loadCityData(this.value,city,town,cityEvents,townEvents);
					provinceEvents&&provinceEvents(this);
				};
				return Dropdownlist;
			};
			//绑定插件
			return {
				Binds :binds //绑定数据
			};
	})();

	window.onload=function(){

		Dropdownlist.Binds('province','city','town',function(e){
			console.log(e.options[e.selectedIndex].text);
		},function(e){
			console.log(e.options[e.selectedIndex].text);
		},function(e){
			console.log(e.options[e.selectedIndex].text);
		});

		Dropdownlist.Binds('province1','city1','town1',function(e){
			console.log(e.options[e.selectedIndex].text);
		},null,function(e){
			console.log(e.options[e.selectedIndex].text);
		});

		Dropdownlist.Binds('province2','city2','town2',null,function(e){
			console.log(e.options[e.selectedIndex].text);
		},null);

	}
</script>	
</head>
<body>

<select id="province"></select>
<select id="city"></select>
<select id="town"></select>

<div></div>
<select id="province1"></select>
<select id="city1"></select>
<select id="town1"></select>


<div></div>
<select id="province2"></select>
<select id="city2"></select>
<select id="town2"></select>

</body>
</html>
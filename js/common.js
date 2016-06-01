$(document).ready(function() {
	var minSquare = 1,
			minWidth = 20,
			maxWidth = 180,
			maxHeight = 180,
			minHeight = 20;
	var priceList = [
	{
		color : "white",
	  netType: "bordered",
	  canvasType : "fiberglass",
	  cost : 600
	},
	{
		color : "white",
	  netType: "bordered",
	  canvasType : "anticat",
	  cost : 1600
	},
	{
		color : "white",
	  netType: "bordered",
	  canvasType : "photoPrint",
	  cost : 1300
	},
	{
		color : "brown",
	  netType: "bordered",
	  canvasType : "fiberglass",
	  cost : 700
	},
	{
		color : "brown",
	  netType: "bordered",
	  canvasType : "anticat",
	  cost : 1700
	},
	{
		color : "brown",
	  netType: "bordered",
	  canvasType : "photoPrint",
	  cost : 1400
	},
	{
		color : "white",
	  netType: "expanding",
	  canvasType : "fiberglass",
	  cost : 1300
	},
	];

	// + и - на кол-ве

	$('.minus').click(function () {
	    var quantity = $(this).parent().find('input');
	    var count = parseInt(quantity.val()) - 1;
	    count = count < 1 ? 1 : count;
	    quantity.val(count);
	    quantity.change();
	    return false;
	});
	$('.plus').click(function () {
	    var quantity = $(this).parent().find('input');
	    quantity.val(parseInt(quantity.val()) + 1);
	    quantity.change();
	    return false;
	});


	// активные/активные/ неактивные чекбоксы

	 function dis(){

		 if($("#expanding").prop('checked')){
	           	$('#brownColor, #anticat, #photoPrint').prop("disabled", true);
	            //  $('#fiberglass').prop("checked", true);
	            // $('#whiteColor').prop("checked", true);	
	      } else {
	      	$('#brownColor, #anticat, #photoPrint').prop("disabled", false)
	      };            
	 };


	function buildOrderDescription(){
		 var Width = $("#width").val(),
		     Height = $("#height").val();
		inputErrorH(); // ограничитель высоты
		inputErrorW();	// ограничитель ширины
		dis();					// активные/ неактивные чекбоксы
		var orderDescription = {
			  	width: Width,										//ширина
			    height: Height,									// высота		    
			    color: $('input[name="netColor"]:checked').val(),  //цвет
			    netType: $('input[name="netType"]:checked').val(),	// тип
			    canvasType: $('input[name="canvasType"]:checked').val(), // полотно
			    installation: ($('#installation').is(':checked')) ? 200 : 0, //установка
			    complectCost: $('input[name="complect"]:checked').val(),    // комплект
			    quantity: $('#quantity').val(),		// кол-во
			    getArea: function()		
			    {
			    	var area = parseFloat((+this.height * +this.width) /10000).toFixed(2); //находим площадь и переводим в м2, округляем до сотых
			    	return area < 1 ? 1 : area;
			    }
	  		};

	  /* проверяем размеры ширины */
	   function inputErrorW() {
	   	if ( Width  > maxWidth){
	   		Width = $("#width").val(180);
	   		Width = maxWidth;
	   		$('.width-error').html("Ширина не может быть больше 180 см");
	   	 } else if (Width < minWidth) {
	   	 	Width = $("#width").val(20);
	   	 	Width = minWidth;
	   	 	$('.width-error').html("Ширина не может быть меньше 20 см");
	   	 } else {
	   	 	Width = $("#width").val();
	   	 	$('.width-error').html("");
	   	 }
	   	  // return false;
	   };
	  /* проверяем размеры высоты */
	   function inputErrorH() {
	   	 if (Height < minHeight) {
	   	 	Height = $("#height").val(20);
	   	 	Height = minHeight;
	   	 	$('.height-error').html("Высота не может быть меньше 20 см");
	   	 } else  if (Height > maxHeight) {
	   	 	Height = $("#height").val(180);
	   	 	Height = maxHeight;
	   	 	$('.height-error').html("Высота не может быть больше 180 см");
	   	 } else {
	   	 	Height = $("#height").val();
	   	 	$('.height-error').html("");
	   	 }
	   	  // return false;
	   };	   

	  return orderDescription;
	};

	// фильтруем чекбоксы
	function findPriceItem(priceList, orderDescription){
		var item = priceList.filter(function(priceItem){
	  	return priceItem.color == orderDescription.color
	    	  && priceItem.netType == orderDescription.netType
	        && priceItem.canvasType == orderDescription.canvasType
	  });
	  return item[0];
	};




	$("#calculator input").change(function() {
		var orderDescription = buildOrderDescription();
		console.log(orderDescription);
		var priceItem = findPriceItem(priceList, orderDescription);
		console.log(priceItem);
		console.log(orderDescription.getArea());
		console.log(priceItem.cost);
		var cost = (((+orderDescription.getArea() * +priceItem.cost) + +orderDescription.installation + +orderDescription.complectCost ) * +orderDescription.quantity).toFixed();
		console.log(cost);

		var	result = $("#rezultat"); // результат
		result.html(cost);
	});

});	
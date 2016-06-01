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
		//input_error();
		dis();
		var orderDescription = {
			  	width: Width,										//ширина
			    height: Height,									// высота
			  	// width: $("#width").val(),										//ширина
			   //  height: $("#height").val(),									// высота			    
			    color: $('input[name="netColor"]:checked').val(),  //цвет
			    netType: $('input[name="netType"]:checked').val(),	// тип
			    canvasType: $('input[name="canvasType"]:checked').val(), // полотно
			    installation: ($('#installation').is(':checked')) ? 200 : 0, //установка
			    complectCost: $('input[name="complect"]:checked').val(),
			    quantity: $('#quantity').val(),		// кол-во
			    getArea: function()		
			    {
			    	return parseFloat((+this.height * +this.width) /10000).toFixed(2); //находим площадь и переводим в м2, округляем до сотых
			    }
	  		};

	  /* проверяем размеры */
	   function input_error() {
	   	if ( Width  > $("#width").val(maxWidth)){
	   		alert(Width),
	   		Width = maxWidth,
	   		alert(orderDescription.width);
	   	 } 
	   	//if (Width  < $("#width").val(minWidth)){
	   	// 	Width = minWidth;
	   	// 	alert(orderDescription.width);
	   	// } 
	   };


//  округляем площадь если меньше 1м2
	   function Square() {
			if(orderDescription.getArea() < minSquare){
				 Width = $("#width").val(100);
				 Height = $("#height").val(100);
				// orderDescription.width = $("#width").val(100);
				// orderDescription.height = $("#height").val(100);									
				alert("площадь равна 1м2");
			};
	   };
	  Square();
	  return orderDescription;
	};


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
		var cost = (((+orderDescription.getArea() * +priceItem.cost) + +orderDescription.installation + +orderDescription.complectCost ) * +orderDescription.quantity);
		console.log(cost);

		var	result = $("#rezultat"); // результат
		result.html(cost);
	});

});	
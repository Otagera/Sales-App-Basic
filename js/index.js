class Product{
	constructor(productCode, name, unitPrice, retailPrice, PV){
		this.productCode = productCode;
		this.name = name;
		this.unitPrice = unitPrice;
		this.retailPrice = retailPrice;
		this.PV = PV;
	}
};
class Order{
	constructor(customerName, customerCode, longrichOrderCode, 
		products, coment, modeOfPayment, index){
		this.index = index || Math.floor(Math.random() * (1000 - 0) + 0 );
		this.customerName = customerName;
		this.customerCode = customerCode;
		this.longrichOrderCode = longrichOrderCode;
		this.products = products;
		this.coment = coment;
		this.modeOfPayment = modeOfPayment;
	}
};
class Delivery {
	constructor(index, products, date){
		this.index = index || Math.floor(Math.random() * (1000 - 0) + 0 );
		this.products = products;
		this.date = date;
	}
};
class InventoryItem {
	constructor(product, quantity){
		this.product = product;
		this.quantity = quantity || Math.floor(Math.random() * (50 - 0) + 0 );
	}
};/*
//Prevent Enter from submnitting form 

$(document).ready(()=>{
	$(window).keydown((event)=>{
		if(event.which === 13) {
			event.preventDefault();
			return false;
		}
	});
});*/
(function(){

	let model = {
		self: this,
		product: [],
		order: [],
		inventory: [],
		state: "",
		ENTER_KEY: 13,
		ESC_KEY: 27,

		init: () => {
			//Initialize Sample Product
			if(!localStorage.product || JSON.parse(localStorage.product).length === 0) {
				let onehun = new Product("onehun", "100g Toothpaste", 10, 11, 2.2);
				let twohun = new Product("twohun", "200g Toothpaste", 10, 11, 2.2);
				let sod = new Product("sod", "SOD", 10, 11, 2.2);
				let cal = new Product("cal", "Calcium", 10, 11, 2.2);
				let lib = new Product("lib", "Libao", 10, 11, 2.2);
				let mengq = new Product("mengq", "Mengqian", 10, 11, 2.2);
				let bam = new Product("bam", "Bamboo Soap", 10, 11, 2.2);
				let cup = new Product("cup", "PI Cup", 10, 11, 2.2);
				let panty = new Product("panty", "Panty Liner", 10, 11, 2.2);
				let fourInOne = new Product("fourInOne", "4-in-1 pad", 10, 11, 2.2);
				let heavy = new Product("heavy", "Heavy Flow", 10, 11, 2.2);
				let anti = new Product("anti", "Anti-Perspirant Dew", 10, 11, 2.2);
				let repel = new Product("repel", "Mosquitoe Repellant", 10, 11, 2.2);
				model.product = [onehun, twohun, sod, cal, lib, mengq, bam, cup, panty];

				model.setLocalStorage("product");
			}else {
				model.getLocalStorage("product");
			}

			//Initialize Sample Order
			if(!localStorage.order || JSON.parse(localStorage.order).length === 0) {
				let skido = new Order("Skido", "NG0123456781", "HO1231", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let chill = new Order("Chill", "NG0123456782", "HO1232", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let lisky = new Order("Lisky", "NG0123456783", "HO1233", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let swiss = new Order("Swiss", "NG0123456784", "HO1234", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let jin = new Order("Jin", "NG0123456785", "HO1235", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let mex = new Order("Mex", "NG0123456786", "HO1236", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let jada = new Order("Jada", "NG0123456787", "HO1237", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let tizza = new Order("Tizza", "NG0123456788", "HO1238", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				let recidivist = new Order("Recidivist", "NG0123456789", "HO1239", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
				model.order = [skido, chill, lisky, swiss, jin, mex, jada, tizza, recidivist];

				model.setLocalStorage("order");
			}else {
				model.getLocalStorage("order");
			}

			//Initialize Sample Inventory
			if(!localStorage.inventory || JSON.parse(localStorage.inventory).length === 0) {
				model.inventory = model.product.map((prod)=>{
					return new InventoryItem(prod);
				});

				model.setLocalStorage("inventory");
			}else {
				model.getLocalStorage("inventory");
			}
		},		
		setLocalStorage: (tempState) => {
			if(tempState === "product"){
				localStorage.product = JSON.stringify(model.product);
			} else if(tempState === "order"){
				localStorage.order = JSON.stringify(model.order);
			} else if(tempState === "inventory"){
				localStorage.inventory = JSON.stringify(model.inventory);
			}
		},
		getLocalStorage: (tempState) => {
			if(tempState === "product"){
				let parsed = JSON.parse(localStorage.product);
				parsed.forEach(function(prod, i){
					let tempProduct = new Product(prod.productCode, prod.name, prod.unitPrice, prod.retailPrice, prod.PV);
					model.product.push(tempProduct);
				});
			} else if(tempState === "order"){
				let parsed = JSON.parse(localStorage.order);
				parsed.forEach(function(ord, i){
					let tempOrder = new Order(ord.customerName, ord.customerCode, 
						 ord.longrichOrderCode, ord.products, ord.coment, 
						ord.modeOfPayment, ord.index);
					model.order.push(tempOrder);
				});
			} else if(tempState === "inventory"){
				let parsed = JSON.parse(localStorage.inventory);
				parsed.forEach(function(inv, i){
					let tempInventory = new InventoryItem(inv.product, inv.quantity);
					model.inventory.push(tempInventory);
				});
			}
		},
		setState: (text)=>{
			if (text === "Product") {
				model.state = "product";
			}else if (text === "Order") {
				model.state = "order";
			}else if (text === "Inventory") {
				model.state = "inventory";
			}
		}
	};

	let octupus = {
		init: () => {
			model.init();
			viewLanding.init();
		},
		getProduct: () => {
			return model.product;
		},
		getOrder: () => {
			return model.order;
		},
		getInventory: () => {
			return model.inventory;
		},
		setState: (text)=>{
			model.setState(text);
		},
		getState: ()=>{
			return model.state;
		},
		setLocalStorage: (tempState)=>{
			model.setLocalStorage(tempState);
		},
		getLocalStorage:()=>{
			return model.getLocalStorage();
		}
	};
	let viewLanding = {
		init: () => {
			$("#menu")[0].checked = false;
			// viewLanding.enter();
			let enterBtns = $(".btn");
			enterBtns.click((e)=>{viewLanding.enter(e);});
		},
		enter: (e) => {
			$("#landing").css("transform", "translate(-200vw)");
			$("#bg").css("transform", "translate(-200vw)");
			$("#dimmed-bg").css("transform", "translate(-200vw)");
			$("#full-site").css("visibility", "visible");
			// $("#full-site").css("overflow", "visible");
			$("#full-site").css("max-height", "auto");
			$("#list").css("z-index", "auto");

			//set State
			octupus.setState(e.target.textContent);

			viewLanding.render();
			viewLanding.simpleBar();
			viewLanding.event();
		},
		event: ()=>{
			$(".clicker").click((e)=>{viewMainOrder.renderProducts(e);});
			$(".writeIconSpan").click((e)=>{
				viewMainEdit.init(e, "edit");
				$(".productRow").on("dblclick", ".textDoubleCLick", (ee)=>{
					$(ee.target).replaceWith(`<input class="smallTableInput" id="" type="" name="" value="${ee.target.textContent}">`);
					$(".productRow").on("keypress", ".smallTableInput", (eee)=>{
						if(eee.which === 13) {
							eee.preventDefault();
							$(eee.target).replaceWith(`<td class="textDoubleCLick">${eee.target.value}</td>`);
							return;
						}
					});
				});
				$(".submit").click((ee)=>{
					$("#productList tbody input").each((itr, inp)=>{
						inp.classList.forEach((t)=>{
							console.log(t);
							if(t === "smallTableInput"){
								inp.replaceWith(`<td class="textDoubleCLick">${inp.value}</td>`);
							}
						});
					});
					ee.preventDefault();
					viewMainEdit.saveChanges(e);
				});

			});
			$(".deleteIconSpan").click((e)=>{
				viewMainModal.init();
				$("#yesDelete").click(()=>{
                    $('#yesDelete').css({display: "block"}).html('<img src="../images/loader.gif" alt="..." width: "10" height="10";>');
					viewMainEdit.init(e, "delete");
					// $("#editForm").css("visibility", "hidden");
				});
				$("#noDelete").click(()=>{
					$("#editForm").html("");
					$("#editForm").css("visibility", "hidden");
				});
			});
			$(".addBtns").click((e)=>{
				octupus.setState(e.target.textContent);
				viewLanding.render();
				viewMainEdit.init(e, "new");

				$(".submit").click((ee)=>{
					$("#productList tbody input").each((itr, inp)=>{
						inp.classList.forEach((t)=>{
							console.log(t);
							if(t === "smallTableInput"){
								inp.replaceWith(`<td class="textDoubleCLick">${inp.value}</td>`);
							}
						});
					});
					ee.preventDefault();
					viewMainEdit.saveChanges();
				});
			});
		},
		render: () => {
			if (model.state === "product") {
				viewMainProduct.init();
			}else if (model.state === "order") {
				viewMainOrder.init();
			}else if (model.state === "inventory") {
				viewMainInventory.init();
			}
		},
		simpleBar: ()  => {
			new SimpleBar(document.getElementById("list"), {
				classNames: {
					content: 'simplebar-content',
					autoHide: false,
					scrollContent: 'simplebar-scroll-content',
					scrollbar: 'simplebar-scrollbar',
					track: 'simplebar-track'
				},
				scrollbarMinSize: 25
			});
		}
	};

	let viewMainProduct = {
		init: () => {
			viewMainProduct.render();
		},
		render: () => {
			$("thead").html("<tr data-id='123'>"
							+ "<th> </td>"
							+ "<th>Product Code</td>"
							+ "<th>Name</td>"
							+ "<th>Unit Price</td>"
							+ "<th>Retail Price</td>"
							+ "<th>PV</td>"
							+ "<th> </td>"
							+ "</tr>");
			let display = "";
			for(let i = 0; i < octupus.getProduct().length; i++){
				display += `<tr data-pcode="${octupus.getProduct()[i].productCode}">`
							+  `<td>`
								+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
							+  `</td>`
							+  `<td>${octupus.getProduct()[i].productCode}</td>`
							+  `<td>${octupus.getProduct()[i].name}</td>`
							+  `<td>${octupus.getProduct()[i].unitPrice}</td>`
							+  `<td>${octupus.getProduct()[i].retailPrice}</td>`
							+  `<td>${octupus.getProduct()[i].PV}</td>`
							+  `<td>`
								+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
							+  `</td>`
						+  `</tr>`;
			}
			$("#list").css("width", "41.3%");
			$("#list").css("margin-left", "5.5rem");
			$("#editForm").css("visibility", "hidden");
			$("tbody").html(display);
		}
	};
	let viewMainOrder = {
		init: () => {
			viewMainOrder.render();
		},
		render: () => {
			$("#list").find("thead").html("<tr>"
							+ "<th>Index</th>"
							+ "<th>Customer Name</th>"
							+ "<th>Customer Code</th>"
							+ "<th>Longrich Order Code</th>"
							+ "<th>Comment</th>"
							+ "<th>Mode of Payment</th>"
						+ "</tr>");
			let display = "";
			for(let i = 0; i < octupus.getOrder().length; i++){
				let prods = "";
				for(let j = 0; j < octupus.getOrder()[i].products.length; j++){
					prods += `<li>`
								+  `<span>${octupus.getOrder()[i].products[j].product.name}:</span>`
								+  `<span>${octupus.getOrder()[i].products[j].quantity}</span>`
							+  `</li>`;
				}
				display += `<tr class="clicker" data-index="${octupus.getOrder()[i].index}">`
							+  `<td>`
								+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
								+  ` ${octupus.getOrder()[i].index}`
							+  `</td>`
							+  `<td>${octupus.getOrder()[i].customerName}</td>`
							+  `<td>${octupus.getOrder()[i].customerCode}</td>`
							+  `<td>${octupus.getOrder()[i].longrichOrderCode}</td>`
							+  `<td>${octupus.getOrder()[i].coment}</td>`
							+  `<td>`
								+  `${octupus.getOrder()[i].modeOfPayment}`
								+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
							+  `</td>`
						+  `</tr>`
						+  `<tr class="test" data-id="${octupus.getOrder()[i].index}">`
							+  `<td colspan="6">`
								+  `<p>Products</p>`
								+  `<ul>${prods}</ul>`
							+  `</td>`
						+  `</tr>`;
			}
			$("#list").css("width", "60%");
			$("#list").css("margin-left", "1.5rem");
			$("#editForm").css("visibility", "hidden");
			$("#productList").css("display", "none");
			$("#list").find("tbody").html(display);
		},
		renderProducts: (ee) => {
			$(".test").each((i, tr)=>{
				if(ee.target.parentElement.dataset.index === tr.dataset.id){
					if($(tr).css("display") == "table-row"){
						$(tr).css("display", "none");
					}else if($(tr).css("display") == "none"){
						$(tr).css("display", "table-row");
					}
				}
			});
		}
	};
	let viewMainInventory = {
		init: () => {
			viewMainInventory.render();
		},
		render: () => {
			$("thead").html("<tr>"
							+ "<th> </th>"
							+ "<th>Products</th>"
							+ "<th>Quantity</th>"
							+ "<th> </th>"
						+ "</tr>");
			let display = "";
			for(let i = 0; i < octupus.getInventory().length; i++){
				display += `<tr data-pcode="${octupus.getInventory()[i].product.productCode}">`
							+  `<td>`
								+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
							+  `</td>`
							+  `<td>${octupus.getInventory()[i].product.name}</td>`
							+  `<td>${octupus.getInventory()[i].quantity}</td>`
							+  `<td>`
								+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
							+  `</td>`
						+  `</tr>`;
			}
			$("#list").css("width", "30%");
			$("#list").css("margin-left", "5.5rem");
			$("#editForm").css("visibility", "hidden");
			$("tbody").html(display);
		}
	};
	let viewMainModal = {
		init: ()=>{
			viewMainModal.modalRender();
		},
		modalRender: ()=>{
			$("#editForm").css("visibility", "visible");
			$("#editForm").css("margin-left", "5.5rem");
			$("#editForm").css("margin-top", "auto");
			$("#editForm").css("margin-bottom", "auto");
			$("#editForm").css("height", "25vh");
			$("#editForm").html(`<div id="modal">`
				+ `<h2 class="bold">This would this ${octupus.getState()}. <br> Are you sure you want to do that?</h2>`
				+ `<button class="black" id="yesDelete">Yes</button>`
				+ `<button class="black" id="noDelete">No</button>`
			+ `</div>`);
		},
		successRender: (whatWasDeleted)=>{
			let name = "";
			if(octupus.getState() === "product") {
				name = whatWasDeleted.name;
			} else if(octupus.getState() === "order") {
				name = whatWasDeleted.customerName;
			} else if(octupus.getState() === "inventory") {
				// name = whatWasDeleted.name;
			}
			$("#editForm").html(`<h2 class="bold">${name} has been succesfully deleted.<br></h2>`);	
			let timeout = setTimeout(()=>{
				$("#editForm").html(``);
			}, 5000);
			clearTimeout(timeout);
		}
	}
	let viewMainEdit = {
		init: (eee, operation) => {
			if(operation === "edit"){
				if(octupus.getState() == "product"){
					octupus.getProduct().forEach((prod)=>{
						if(prod.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							viewMainEdit.render(prod);
						}
					});
				}else if(octupus.getState() == "order"){
					octupus.getOrder().forEach((ord)=>{
						if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
							viewMainEdit.render(ord);
						}
					});
				}else if(octupus.getState() == "inventory"){
					octupus.getInventory().forEach((inv)=>{
						if(inv.product.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							viewMainEdit.render(inv);
						}
					});
				}			
			}else if(operation === "new"){
				viewMainEdit.render();
			}else if(operation === "delete"){
				if(octupus.getState() == "product"){
					octupus.getProduct().forEach((prod, i)=>{
						if(prod.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							octupus.getProduct().splice(i, 1);
							octupus.setLocalStorage("product");
							setTimeout(()=>{
								viewMainModal.successRender(prod);
							}, 2000);
						}
					});
				}else if(octupus.getState() == "order"){
					octupus.getOrder().forEach((ord, i)=>{
						if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
							octupus.getOrder().splice(i, 1);
							octupus.setLocalStorage("order");
							setTimeout(()=>{
								viewMainModal.successRender(prod);
							}, 2000);
						}
					});
				}else if(octupus.getState() == "inventory"){
					octupus.getInventory().forEach((inv, i)=>{
						if(inv.product.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							octupus.getInventory().splice(i, 1);
							octupus.setLocalStorage("inventory");
							setTimeout(()=>{
								viewMainModal.successRender(prod);
							}, 2000);
						}
					});
				}
				setTimeout(()=>{
					viewMainProduct.init();
					viewLanding.event();
				}, 2000);
			}
		},
		render: (selected) => {
			let display = "";
			
			if(octupus.getState() == "product"){
				display = viewMainEdit.productEdit(selected);
				$("#editForm").css("margin-left", "5.5rem");
				$("#editForm").css("height", "55vh");
			}else if(octupus.getState() == "order"){
				display = viewMainEdit.orderEdit(selected);
				$("#editForm").css("margin-left", "1.5rem");
				$("#productList").css("display", "initial");
				$("#editForm").css("height", "75vh");
			}else if(octupus.getState() == "inventory"){
				display = viewMainEdit.inventoryEdit(selected);
				$("#editForm").css("margin-left", "5rem");
				$("#editForm").css("height", "25vh");
				$("#editForm").css("margin-top", "5rem");
			}
			$("#editForm").css("visibility", "visible");
			$("#editForm").html(display);
		},
		productEdit: (selected)=> {
			let tempSelected = selected || new Product("", "", "", "", "");
			let display = `<form>`
							+  `<div class="input-group">`
								+  `<label>Product Code: ${tempSelected.productCode}</label>`
								+  `<input id="productCode" type="text" name="productCode" value="${tempSelected.productCode}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="name">Name: </label>`
								+  `<input id="name" type="text" name="name" value="${tempSelected.name}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="unitPrice">Unit Price: </label>`
								+  `<input id="unitPrice" type="text" name="unitPrice" value="${tempSelected.unitPrice}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="retailPrice">Retail Price</label>`
								+  `<input id="retailPrice" type="text" name="retailPrice" value="${tempSelected.retailPrice}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="pv">PV</label>`
								+  `<input id="pv" type="text" name="pv" value="${tempSelected.PV}">`
							+  `</div>`
							+  `<input  class="submit" id="submitProduct" type="submit" name="submit" value="Submit">`
						+  `</form>`;
			return display;
		},
		orderEdit: (selected)=> {
			/* change for mode of payment
			let prods = "";
			for(let i = 0; i < selected.products.length; i++){
				console.log(selected.products[i]);
				prods += `<option value="${selected.products[i].product.productCode}">${selected.products[i].product.name}</option>`;
			}
			+  `<select class="custom-select" id="products">`
				+  `<option selected></option>`
				+  `${prods}`
			+  `</select>`
			*/
			let tempSelected = selected || new Order("", "", "", [], "", "");
			let prods = "";
			for(let i = 0; i < tempSelected.products.length; i++){
				prods += `<tr class="productRow"><td>${tempSelected.products[i].product.name}</td><td class="textDoubleCLick">${tempSelected.products[i].quantity}</td></tr>`;
			}
			let display = `<form>`
							+  `<div class="input-group">`
								+  `<label id="indexLabel">Index: ${tempSelected.index}</label>`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="customerName">Customer Name: </label>`
								+  `<input id="customerName" type="text" name="customerName" value="${tempSelected.customerName}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="customerCode">Customer Code: </label>`
								+  `<input id="customerCode" type="text" name="customerCode" value="${tempSelected.customerCode}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="longrichOrderCode">Longrich Order Code</label>`
								+  `<input id="longrichOrderCode" type="text" name="longrichOrderCode" value="${tempSelected.longrichOrderCode}">`
							+  `</div>`
							+  `<div class="input-group" style="margin-bottom: 30px;">`
								+  `<label for="products">Products: </label>`
								+  `<div data-simplebar id="productList">`
									+  `<table>`
										+  `<thead><tr><th>Name</th><th>Quantity</th></tr></thead>`
										+  `<tbody>${prods}</tbody>`
									+  `</table>`
								+  `</div>`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="coment">Comment</label>`
								+  `<input id="coment" type="text" name="coment" value="${tempSelected.coment}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="modeOfPayment">Mode Of Payment</label>`
								+  `<input id="modeOfPayment" type="text" name="modeOfPayment" value="${tempSelected.modeOfPayment}">`
							+  `</div>`
							+  `<input  class="submit" id="submitOrder" type="submit" name="submit" value="Submit">`
						+  `</form>`;
			return display;
		},
		inventoryEdit: (selected)=> {
			let display = `<form>`
							+  `<div class="input-group">`
								+  `<label>Product Name: ${selected.product.name}</label>`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="quantity">Quantity: </label>`
								+  `<input id="quantity" type="text" name="quantity" value="${selected.quantity}">`
							+  `</div>`
							+  `<input  class="submit" id="submitInventory" type="submit" name="submit" value="Submit">`
						+  `</form>`;
			return display;
		},
		saveChanges: (eee) => {
			let exists = false;
			if(eee){exists = true;}
			if(octupus.getState() == "product"){
				let pCodeInput = $("#productCode").val();
				let nameInput = $("#name").val();
				let unitPriceInput = $("#unitPrice").val();
				let retailPriceInput = $("#retailPrice").val();
				let pvInput = $("#pv").val();
				
				if(exists){
					octupus.getProduct().forEach((prod, i)=>{
						if(prod.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							prod.productCode = pCodeInput;
							prod.name = nameInput;
							prod.unitPrice = unitPriceInput;
							prod.retailPrice = retailPriceInput;
							prod.PV = pvInput;
						}
					});					
				}else {
					octupus.getProduct().push(new Product(pCodeInput, nameInput, unitPriceInput, retailPriceInput, pvInput));
				}
				octupus.setLocalStorage("product");
				viewMainProduct.init();
				viewLanding.event();
			}else if(octupus.getState() == "order"){
				if(exists){
					octupus.getOrder().forEach((ord, i)=>{
						let customerNameInput = $("#customerName").val();
						let customerCodeInput = $("#customerCode").val();
						let longrichOrderCodeInput = $("#longrichOrderCode").val();
						let comentInput = $("#coment").val();
						let modeOfPaymentInput = $("#modeOfPayment").val();

						if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
							ord.customerName = customerNameInput;
							ord.customerCode = customerCodeInput;
							ord.longrichOrderCode = longrichOrderCodeInput;
							ord.coment = comentInput;
							ord.modeOfPayment = modeOfPaymentInput;

							$("#productList tbody td").each((itr, td)=>{
								td.classList.forEach((t)=>{
									if(t === "textDoubleCLick"){
										ord.products.forEach((invIt)=>{
											if (invIt.product.name === td.previousSibling.textContent) {
												invIt.quantity = td.textContent;
											}
										});
									}
								});
							});
						}
					});			
				}else {
					octupus.getOrder().push(customerNameInput, customerCodeInput, longrichOrderCodeInput, comentInput, modeOfPaymentInput, $("#indexLabel").textContent);

				}
				octupus.setLocalStorage("order");
				viewMainOrder.init();
				viewLanding.event();
			}else if(octupus.getState() == "inventory"){
				if(exists){
					octupus.getInventory().forEach((inv, i)=>{
						if(inv.product.productCode == eee.currentTarget.parentElement.parentElement.dataset.pcode){
							inv.quantity = $("#quantity").val();
						}
					});
				}else {
					octupus.getInventory().push(new InventoryItem(octupus.getProduct()[2], $("#quantity").val()))
				}
				octupus.setLocalStorage("inventory");
				viewMainInventory.init();
				viewLanding.event();
			}
		}
	};
	octupus.init();
})();
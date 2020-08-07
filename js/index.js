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
};

(function(){

	let model = {
		self: this,
		product: [],
		order: [],
		inventory: [],
		state: "",

		init: () => {
			//Initialize Sample Product
			if(!localStorage.product || JSON.parse(localStorage.product).length === 0) {
				let onehun = new Product("onehun", "100g Toothpaste", 10, 11, 2.2);
				let twohun = new Product("twohun", "100g Toothpaste", 10, 11, 2.2);
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
		getState: ()=>{
			return model.state;
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
			if (e.target.textContent === "Product") {
				model.state = "product";
			}else if (e.target.textContent === "Order") {
				model.state = "order";
			}else if (e.target.textContent === "Inventory") {
				model.state = "inventory";
			}
			viewLanding.render();
			viewLanding.simpleBar();
			$(".clicker").click((ee)=>{viewMainOrder.renderProducts(ee);});
			$(".test").click((ee)=>{viewMainOrder.unrenderProducts(ee);});
			$(".writeIconSpan").click((eee)=>{viewMainEdit.init(eee);});
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
							+ "<th>Product Code</td>"
							+ "<th>Name</td>"
							+ "<th>Unit Price</td>"
							+ "<th>Retail Price</td>"
							+ "<th>PV</td>"
							+ "</tr>");
			let display = "";
			for(let i = 0; i < octupus.getProduct().length; i++){
				display += `<tr>`
							+  `<td>${octupus.getProduct()[i].productCode}</td>`
							+  `<td>${octupus.getProduct()[i].name}</td>`
							+  `<td>${octupus.getProduct()[i].unitPrice}</td>`
							+  `<td>${octupus.getProduct()[i].retailPrice}</td>`
							+  `<td>${octupus.getProduct()[i].PV}</td>`
						+  `</tr>`;
			}
			$("#list").css("width", "39.3%");
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
			$("thead").html("<tr>"
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
							+  `<td>${octupus.getOrder()[i].modeOfPayment}</td>`
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
			$("tbody").html(display);
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
						+ "</tr>");
			let display = "";
			for(let i = 0; i < octupus.getInventory().length; i++){
				display += `<tr>`
							+  `<td>`
								+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
							+  `</td>`
							+  `<td>${octupus.getInventory()[i].product.name}</td>`
							+  `<td>${octupus.getInventory()[i].quantity}</td>`
						+  `</tr>`;
			}
			$("#list").css("width", "30%");
			$("#list").css("margin-left", "5.5rem");
			$("#editForm").css("visibility", "hidden");
			$("tbody").html(display);
		}
	};
	let viewMainEdit = {
		init: (eee) => {
			console.log("viewMainEdit.init()");
			if(octupus.getState() == "product"){
				octupus.getProduct().forEach((ord)=>{
					if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
						viewMainEdit.render(ord);
					}
				});
				display = viewMainEdit.productEdit(selected);
				$("#editForm").css("margin-left", "5.5rem");
			}else if(octupus.getState() == "order"){
				octupus.getOrder().forEach((ord)=>{
					if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
						viewMainEdit.render(ord);
					}
				});
				display = viewMainEdit.orderEdit(selected);
				$("#editForm").css("margin-left", "1.5rem");
			}else if(octupus.getState() == "order"){
				octupus.getInventory().forEach((ord)=>{
					if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
						viewMainEdit.render(ord);
					}
				});
				display = viewMainEdit.inventoryEdit(selected);
				$("#editForm").css("margin-left", "5rem");
			}
			octupus.getOrder().forEach((ord)=>{
				if(ord.index == eee.currentTarget.parentElement.parentElement.dataset.index){
					viewMainEdit.render(ord);
				}
			});
			$("#editForm").css("css", "75vh");
			$("#editForm").css("visibility", "visible");
		},
		render: (selected) => {
			console.log(octupus.getState());
			let display = "";
			
			if(octupus.getState() == "product"){
				display = viewMainEdit.productEdit(selected);
				$("#editForm").css("css", "75vh");
				$("#editForm").css("margin-left", "5.5rem");
				$("#editForm").css("visibility", "visible");
			}else if(octupus.getState() == "order"){
				display = viewMainEdit.orderEdit(selected);
				$("#editForm").css("css", "75vh");
				$("#editForm").css("margin-left", "1.5rem");
				$("#editForm").css("visibility", "visible");
			}else if(octupus.getState() == "order"){
				display = viewMainEdit.inventoryEdit(selected);
				$("#editForm").css("css", "75vh");
				$("#editForm").css("margin-left", "5rem");
				$("#editForm").css("visibility", "visible");
			}
			$("#editForm").html(display);
		},
		productEdit: (selected)=> {
			let display = `<form>`
							+  `<div class="input-group">`
								+  `<label>Product Code: ${selected.productCode}</label>`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="name">Name: </label>`
								+  `<input id="name" type="text" name="name" value="${selected.name}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="unitPrice">Unit Price: </label>`
								+  `<input id="unitPrice" type="text" name="unitPrice" value="${selected.unitPrice}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="retailPrice">Retail Price</label>`
								+  `<input id="retailPrice" type="text" name="retailPrice" value="${selected.retailPrice}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="pv">Comment</label>`
								+  `<input id="pv" type="text" name="pv" value="${selected.pv}">`
							+  `</div>`
							+  `<input id="customerName" type="submit" name="submit" value="Submit">`
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
			let prods = "";
			for(let i = 0; i < selected.products.length; i++){
				prods += `<tr><td>${selected.products[i].product.name}</td><td>${selected.products[i].quantity}</td></tr>`;
			}
			let display = `<form>`
							+  `<div class="input-group">`
								+  `<label>Index: ${selected.index}</label>`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="customerName">Customer Name: </label>`
								+  `<input id="customerName" type="text" name="customerName" value="${selected.customerName}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="customerCode">Customer Code: </label>`
								+  `<input id="customerCode" type="text" name="customerCode" value="${selected.customerCode}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="longrichOrderCode">Longrich Order Code</label>`
								+  `<input id="longrichOrderCode" type="text" name="longrichOrderCode" value="${selected.longrichOrderCode}">`
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
								+  `<input id="coment" type="text" name="coment" value="${selected.coment}">`
							+  `</div>`
							+  `<div class="input-group">`
								+  `<label for="modeOfPayment">Mode Of Payment</label>`
								+  `<input id="modeOfPayment" type="text" name="modeOfPayment" value="${selected.modeOfPayment}">`
							+  `</div>`
							+  `<input id="customerName" type="submit" name="submit" value="Submit">`
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
							+  `<input id="customerName" type="submit" name="submit" value="Submit">`
						+  `</form>`;
			return display;
		},
		saveChanges: () => {

		}
	};
	octupus.init();
})();
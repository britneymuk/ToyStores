/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Quantity


******************************/

$(document).ready(function () {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initSearch();
	initMenu();
	initQuantity();

	/* 

	2. Set Header

	*/

	function setHeader() {
		if ($(window).scrollTop() > 100) {
			header.addClass('scrolled');
		}
		else {
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch() {
		if ($('.search').length && $('.search_panel').length) {
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function () {
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu() {
		if ($('.hamburger').length) {
			var hamb = $('.hamburger');

			hamb.on('click', function (event) {
				event.stopPropagation();

				if (!menuActive) {
					openMenu();

					$(document).one('click', function cls(e) {
						if ($(e.target).hasClass('menu_mm')) {
							$(document).one('click', cls);
						}
						else {
							closeMenu();
						}
					});
				}
				else {
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if ($('.page_menu_item').length) {
				var items = $('.page_menu_item');
				items.each(function () {
					var item = $(this);

					item.on('click', function (evt) {
						if (item.hasClass('has-children')) {
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
							if (subItem.hasClass('active')) {
								subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, { height: 0 });
							}
							else {
								subItem.toggleClass('active');
								TweenMax.set(subItem, { height: "auto" });
								TweenMax.from(subItem, 0.3, { height: 0 });
							}
						}
						else {
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu() {
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu() {
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Quantity

	*/

	function initQuantity() {
		// Handle product quantity input
		if ($('.product_quantity').length) {
			var input = $('#quantity_input');
			var incButton = $('#quantity_inc_button');
			var decButton = $('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function () {
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
			});

			decButton.on('click', function () {
				originalVal = input.val();
				if (originalVal > 0) {
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}

	// Updated JS for checkout.js

	let list_title = document.querySelectorAll(".order_list_title");
	let list_value = document.querySelectorAll(".order_list_value");
	if (typeof (Storage) !== "undefined") {
		list_title[1].innerHTML = localStorage.getItem("itemNamej");
		for (let i = 0; i < list_value.length; i++) {
			if (i != 0 && i != 3)
				list_value[i].innerHTML = localStorage.getItem("gTotal");
		}
	}

	//billing details store
	let bitem1 = document.querySelector("#checkout_name");
	let bitem2 = document.querySelector("#checkout_last_name");
	let bitem3 = document.querySelector("#checkout_company");
	let bitem4 = document.querySelector("#checkout_country");
	let bitem5 = document.querySelector("#checkout_address");
	let bitem6 = document.querySelector("#checkout_zipcode");
	let bitem7 = document.querySelector("#checkout_city");
	let bitem8 = document.querySelector("#checkout_province");
	let bitem9 = document.querySelector("#checkout_phone");
	let bitem10 = document.querySelector("#checkout_email");

	if (typeof (Storage) !== "undefined" && localStorage.getItem("bname") != "") {
		bitem1.value = localStorage.getItem("bname");
		bitem2.value = localStorage.getItem("blname");
		bitem3.value = localStorage.getItem("bcomp");
		bitem4.value = localStorage.getItem("bcountry");
		bitem5.value = localStorage.getItem("baddr");
		bitem6.value = localStorage.getItem("bzip");
		bitem7.value = localStorage.getItem("bcity");
		bitem8.value = localStorage.getItem("bprov");
		bitem9.value = localStorage.getItem("bphone");
		bitem10.value = localStorage.getItem("bemail");
	}

	document.querySelector(".order_button").addEventListener("click", function () {

		bitem1 = document.querySelector("#checkout_name").value;
		bitem2 = document.querySelector("#checkout_last_name").value;
		bitem3 = document.querySelector("#checkout_company").value;
		bitem4 = document.querySelector("#checkout_country").value;
		bitem5 = document.querySelector("#checkout_address").value;
		bitem6 = document.querySelector("#checkout_zipcode").value;
		bitem7 = document.querySelector("#checkout_city").value;
		bitem8 = document.querySelector("#checkout_province").value;
		bitem9 = document.querySelector("#checkout_phone").value;
		bitem10 = document.querySelector("#checkout_email").value;
		let modalval = document.querySelector(".congo").innerHTML = "Congratulations " + bitem1;

		if (typeof (Storage) !== "undefined") {
			localStorage.setItem("bname", bitem1);
			localStorage.setItem("blname", bitem2);
			localStorage.setItem("bcomp", bitem3);
			localStorage.setItem("bcountry", bitem4);
			localStorage.setItem("baddr", bitem5);
			localStorage.setItem("bzip", bitem6);
			localStorage.setItem("bcity", bitem7);
			localStorage.setItem("bprov", bitem8);
			localStorage.setItem("bphone", bitem9);
			localStorage.setItem("bemail", bitem10);
		}

		// HTML TO PDF CONVERT
		const filename = 'ThisIsYourPDFFilename.pdf';
		html2canvas(document.getElementById('printPDF'), {
			scrollX: 0,
			scrollY: -window.scrollY,
			sharp: 1
		}).then(canvas => {
			document.body.appendChild(canvas);
			var imgData = canvas.toDataURL(
				'image/png');
			var doc = new jsPDF('p', 'mm', 'a4');
			doc.addImage(imgData, 'PNG', 10, 10);
			doc.save('sample-file.pdf');
		});
	});

	

});
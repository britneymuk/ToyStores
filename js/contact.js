/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Google Map


******************************/

$(document).ready(function () {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;
	var map;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	changeBGandWeather();
	initSearch();
	initMenu();
	initGoogleMap();

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
							alert();
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

	5. Init Google Map

	*/

	function initGoogleMap() {
		var myLatlng = new google.maps.LatLng(4.319440, 101.142590);
		var mapOptions =
		{
			center: myLatlng,
			zoom: 15,
		}
		// Initialize a map with options
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);


		var marker = new google.maps.Marker({
			position: LatLng,
			icon: 'images/marker.png',
			map: map
		});
	}

	// Updated JS for contact.html
	//color change
	function changeBGandWeather() {
		let contactbg = document.querySelector(".contact_col");
		contactbg.style.backgroundColor = "#fff";
		if (localStorage.getItem("cbgColor") != "") {
			contactbg.style.backgroundColor = localStorage.getItem("cbgColor");
		}
		document.querySelector(".bgColChange").addEventListener("click", function () {
			let contactbg = document.querySelector(".contact_col");
			if (contactbg.style.backgroundColor == "rgb(255, 255, 255)") {
				if (typeof (Storage) !== "undefined") {
					localStorage.setItem("cbgColor", "#eae2b7");
				}
				contactbg.style.backgroundColor = "#eae2b7";
			}
			else {
				if (typeof (Storage) !== "undefined") {
					localStorage.setItem("cbgColor", "#fff");
				}
				contactbg.style.backgroundColor = "#fff";

			}
		});

		let tempcel = document.querySelector("#tempcelsius");
		let tempdesc = document.querySelector("#tempdesc");


		// Weather Data
		const api = "https://api.openweathermap.org/data/2.5/weather?id=1735161&&units=metric&appid=40c14bda4db1e3962f4e4cffe09c96e0";

		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				const temp = data.main.temp;
				const weather = data.weather[0].main;
				tempcel.innerHTML = temp + '<span class="CC"> C</span>';
				tempdesc.innerHTML = weather;
			})
	}

});
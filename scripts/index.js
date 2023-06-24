const toggleButton = document.getElementById("toggle-button");
const navbar = document.getElementById("sidebar");
const listItems = document.querySelectorAll("#sidebar ul li");
const contentDivs = document.querySelectorAll("#content > div");

toggleButton.addEventListener("click", toggle);
function toggle() {
	navbar.classList.toggle("active");
}
function remove(elem) {
	elem.classList.remove("active");
}
function getTextContent(element) {
	let text = "";
	const nodes = element.childNodes;
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.nodeType === Node.TEXT_NODE) {
			text += node.textContent.trim();
		}
	}
	return text;
}

listItems.forEach((listItem, index) => {
	const link = listItem.querySelector("a");
	const title = getTextContent(link);
	listItem.setAttribute("title", title);
	listItem.addEventListener("click", () => {
		listItems.forEach((item) => {
			remove(item);
		});
		listItem.classList.add("active");
		contentDivs.forEach((div) => {
			div.style.display = "none";
		});
		contentDivs[index].style.display = "block";
		if (window.matchMedia("(max-width: 750px)").matches) {
			remove(navbar);
		}
	});
});
function firstclick() {
	const homeListItem = listItems[0];
	const homeClickEvent = new Event("click");
	homeListItem.dispatchEvent(homeClickEvent);
}
firstclick();

const mediaQuery = window.matchMedia("(max-width: 750px)");
const handleMediaQueryChange = (mediaQuery) => {
	if (mediaQuery.matches) {
		remove(navbar);
		document.addEventListener("click", handleClickOutsideNavbar);
		document.addEventListener("scroll", handleScroll);
		document.addEventListener("touchstart", handleTouchStart);
	} else {
		navbar.classList.add("active");
	}
};
const isClickedInsideNavbar = (event) => {
	return navbar.contains(event.target);
};
const handleClickOutsideNavbar = (event) => {
	if (!isClickedInsideNavbar(event)) {
		remove(navbar);
	}
};
let initialTouchX;
const handleTouchStart = (event) => {
	initialTouchX = event.touches[0].clientX;
	if (initialTouchX <= 30) {
		document.addEventListener("touchmove", handleTouchMove);
	}
};
const handleTouchMove = (event) => {
	const currentTouchX = event.touches[0].clientX;
	const touchDifference = currentTouchX - initialTouchX;

	if (touchDifference > 80) {
		navbar.classList.add("active");
	}
};
const handleScroll = () => {
	const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
	if (scrollLeft <= 40) {
		remove(navbar);
	}
};
handleMediaQueryChange(mediaQuery);
mediaQuery.addListener(handleMediaQueryChange);

document.addEventListener("DOMContentLoaded", () => {
	const logoImage = document.getElementById("logo-image");
	const storedlogoImageUrl = localStorage.getItem("logoImage");
	if (storedlogoImageUrl) {
		logoImage.style.backgroundImage = `url(${storedlogoImageUrl})`;
	}
	logoImage.addEventListener("click", () => {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.addEventListener("change", (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (e) => {
				const imagelogoUrl = e.target.result;
				logoImage.style.backgroundImage = `url(${imagelogoUrl})`;
				localStorage.setItem("logoImage", imagelogoUrl);
			};
			reader.readAsDataURL(file);
		});
		fileInput.click();
	});
});

var spinner = function () {
	const spinnerElement = document.getElementById("spinnerdiv");
	const wraperElement = document.querySelector(".wraper");
	wraperElement.style.opacity = "0";
	wraperElement.style.visibility = "hidden";
	setTimeout(function () {
		if (spinnerElement) {
			spinnerElement.classList.remove("show");
		}
	}, 300);
	setTimeout(function () {
		wraperElement.style.opacity = "1";
		wraperElement.style.visibility = "visible";
		wraperElement.style.transition = ".5s all ease-in-out";
	}, 850);
};
spinner();

document.addEventListener("DOMContentLoaded", function () {
	var url = window.location.href;
	var hashIndex = url.indexOf("#");
	if (hashIndex !== -1) {
		var sectionId = url.substr(hashIndex + 1);
		var section = document.getElementById(sectionId);
		if (section) {
			var sectionIndex = Array.from(listItems).findIndex(function (
				listItem
			) {
				var link = listItem.querySelector("a");
				return link.getAttribute("href") === "#" + sectionId;
			});
			if (sectionIndex !== -1) {
				const sectionListItem = listItems[sectionIndex];
				const sectionClickEvent = new Event("click");
				sectionListItem.dispatchEvent(sectionClickEvent);
			}
		}
	}
});

function getRandomIndex(length) {
	return Math.floor(Math.random() * length);
}

function getRandomDate() {
	var start = new Date(1990, 0, 1);
	var end = new Date(2020, 11, 31);
	var randomTime =
		start.getTime() + Math.random() * (end.getTime() - start.getTime());
	var randomDate = new Date(randomTime);
	return randomDate;
}

var container = document.getElementById("container");
var isLoading = false;
function fetchAndDisplayData() {
	if (isLoading) return;
	isLoading = true;
	fetch("https://type.fit/api/quotes")
		.then((response) => response.json())
		.then(function (quotes) {
			for (let i = 0; i < 5; i++) {
				fetch("https://randomuser.me/api")
					.then((response) => response.json())
					.then(function (userData) {
						var randomQuoteIndex = getRandomIndex(quotes.length);
						var randomQuote = quotes[randomQuoteIndex];
						var randomUserIndex = getRandomIndex(
							userData.results.length
						);
						var user = userData.results[randomUserIndex];
						var randomDate = getRandomDate();
						var formattedDate = randomDate.toLocaleDateString(
							"en-US",
							{
								month: "long",
								day: "2-digit",
								year: "numeric",
							}
						);
						const email = userData.results[0].email;
						const username = email.substring(0, email.indexOf("@"));
						const mail = [
							"gmail",
							"yahoo",
							"hotmail",
							"outlook",
							"icloud",
						];
						const randomIndex = Math.floor(
							Math.random() * mail.length
						);
						const randomMail = mail[randomIndex];
						container.innerHTML += `
						<div class="post" data-index="${randomQuoteIndex}">
				<div class="post-header">
				  <img
				  title="${username}@${randomMail}.com"
					src="${user.picture.large}"
					alt="Profile Picture"
					class="profile-pic img"
					style="cursor: pointer"
					loading="lazy" />
				  <div class="post-info">
					<h3 class="name">${userData.results[0].name.first} ${userData.results[0].name.last}</h3>
					<p class="date">${formattedDate}</p>
				  </div>
				</div>
				<div class="post-content">
				  <p>
					${randomQuote.text}
				  </p>
				</div>
				<div class="functions">
				<i class="bi bi-heart" onclick="heartChange(this)"></i>
				<i class="bi bi-clipboard" onclick="copyChange(this)"></i>
				<i class="bi bi-share" onclick="shareChange(this)"></i>
				</div>
			  </div>`;
					})
					.catch(function (error) {
						throw Error(error);
					});
			}
			isLoading = false;
		})
		.catch(function (error) {
			isLoading = false;
			throw Error(error);
		});
}
fetchAndDisplayData();
window.addEventListener("scroll", function () {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1500 &&
		!isLoading
	) {
		fetchAndDisplayData();
	}
});

function heartChange(element) {
	element.classList.toggle("bi-heart");
	element.classList.toggle("bi-heart-fill");
	var postElement = element.closest(".post");
	var isFavorite = element.classList.contains("bi-heart-fill");
	if (isFavorite) {
		addToFavorites(postElement);
	} else {
		removeFromFavorites(postElement);
	}
}

function addToFavorites(postElement) {
	var favoritesContainer = document.getElementById("favoritesContainer");
	var favoritePostsArray =
		JSON.parse(localStorage.getItem("favoritePosts")) || [];
	var postExists = favoritePostsArray.some(function (postHTML) {
		var post = document.createElement("div");
		post.innerHTML = postHTML;
		return post.firstChild.isEqualNode(postElement);
	});
	if (!postExists) {
		var favoritePost = postElement.cloneNode(true);
		favoritesContainer.appendChild(favoritePost);
		favoritePostsArray.push(favoritePost.outerHTML);
		localStorage.setItem(
			"favoritePosts",
			JSON.stringify(favoritePostsArray)
		);
	}
}

function removeFromFavorites(postElement) {
	var favoritesContainer = document.getElementById("favoritesContainer");
	var favoritePosts = favoritesContainer.getElementsByClassName("post");
	var favoritePostsArray =
		JSON.parse(localStorage.getItem("favoritePosts")) || [];
	for (var i = 0; i < favoritePostsArray.length; i++) {
		if (favoritePosts[i].isEqualNode(postElement)) {
			favoritePosts[i].remove();
			favoritePostsArray.splice(i, 1);
			localStorage.setItem(
				"favoritePosts",
				JSON.stringify(favoritePostsArray)
			);
			break;
		}
	}
}

function displayFavoritePosts() {
	var favoritesContainer = document.getElementById("favoritesContainer");
	favoritesContainer.innerHTML = "";

	var favoritePostsArray =
		JSON.parse(localStorage.getItem("favoritePosts")) || [];

	favoritePostsArray.forEach(function (postHTML) {
		var postElement = document.createElement("div");
		postElement.innerHTML = postHTML;
		favoritesContainer.appendChild(postElement.firstChild);
	});
}
displayFavoritePosts();

function copyChange(element) {
	if (element.classList.contains("bi-clipboard-check-fill")) {
		return;
	}

	element.classList.replace("bi-clipboard", "bi-clipboard-check-fill");

	var postElement = element.closest(".post");
	var postContentElement = postElement.querySelector(".post-content");
	var text = postContentElement.innerText;

	navigator.clipboard
		.writeText(text)
		.then(() => {
			var titleDiv = document.createElement("div");
			titleDiv.classList.add("copy-alert");
			titleDiv.textContent = "Text Copied to clipboard!";
			document.body.appendChild(titleDiv);

			setTimeout(function () {
				titleDiv.remove();
				element.classList.replace(
					"bi-clipboard-check-fill",
					"bi-clipboard"
				);
			}, 2000);
		})
		.catch((error) => {
			console.error("Copy to clipboard failed:", error);
			element.classList.replace(
				"bi-clipboard-check-fill",
				"bi-clipboard"
			);
		});
}

function shareChange(element) {
	element.classList.toggle("bi-share");
	element.classList.toggle("bi-share-fill");
	if (element.classList.contains("bi-share-fill")) {
		var postElement = element.closest(".post");
		var postContentElement = postElement.querySelector(".post-content");
		var text = postContentElement.innerText;
		if (navigator.share) {
			navigator
				.share({
					title: "Share Post",
					text: text,
					url: window.location.href,
				})
				.then(() => {
					console.log("Post shared successfully.");
				})
				.catch((error) => {
					console.error("Error sharing post:", error);
				});
		} else {
			console.log("Share API not supported in this browser.");
		}
	}
}

document.querySelectorAll(".ripple").forEach((btn) => {
	let shouldPreventClick = true;
	btn.addEventListener("click", function (e) {
		if (shouldPreventClick) {
			shouldPreventClick = true;
			return;
		}
		createRipple(e, this);
	});
	btn.addEventListener("mousedown", function (e) {
		setTimeout(() => {
			createRipple(e, this);
			shouldPreventClick = true;
		}, 100);
	});
	btn.addEventListener("touchstart", function (e) {
		shouldPreventClick = false;
		createRipple(e.touches[0], this);
	});
	function createRipple(touch, element) {
		let rect = element.getBoundingClientRect();
		let x = touch.clientX - rect.left - window.scrollX;
		let y = touch.clientY - rect.top - window.scrollY;
		let ripple = document.createElement("span");
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		element.appendChild(ripple);
		setTimeout(() => {
			ripple.remove();
		}, 1000);
	}
});

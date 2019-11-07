let TTT = {};

TTT.getTTTdivMenuThemeSettings = function() {
	htm = `

	<details class=details__primary open>

	<summary class=summary__primary >Settings menu</summary>

	<details class=details__secondary open>

		<summary class=summary__secondary >theme colors</summary>

		<p>
			<button id="btnRed" class=button >red</button>
			<button id="btnBlue" class=button >blue</button>
			<button id="btnGreen" class=button >green</button>
		</p>

		<p>
			hue <output id=outHue class=menu__output ></output>
			<input type="range" id="inpHue" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			saturation <output id=outSaturation class=menu__output ></output>
			<input type="range" id="inpSaturation" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			lightness1 <output id=outLightness1 class=menu__output ></output>
			<input type="range" id="inpLightness1" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			lightness2 <output id=outLightness2 class=menu__output ></output>
			<input type="range" id="inpLightness2" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			lightness3 <output id=outLightness3 class=menu__output ></output>
			<input type="range" id="inpLightness3" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			lightness4 <output id=outLightness4 class=menu__output ></output>
			<input type="range" id="inpLightness4" class=menu__input oninput=TTT.onInput(); />
		</p>
		<p>
			lightness5 <output id=outLightness5 class=menu__output ></output>
			<input type="range" id="inpLightness5" class=menu__input oninput=TTT.onInput(); />
		</p>

	</details>
	`;

	return htm;
};

TTT.initialize = function() {
	const txt = localStorage.getItem("theme") || "[]";
	const theme = JSON.parse(txt).forEach(item => {
		const key = Object.keys(item)[0];
		const input = (document.querySelectorAll("#" + key)[0].value = item[key]);
	});

	TTT.onInput();

	btnRed.onclick = () => {
		inpHue.value = 100;
		TTT.resetValues();
		TTT.onInput();
	};

	btnBlue.onclick = () => {
		inpHue.value = 66;
		TTT.resetValues();
		TTT.onInput();
	};

	btnGreen.onclick = () => {
		inpHue.value = 33;
		TTT.resetValues();
		TTT.onInput();
	};
};

TTT.resetValues = function() {
	inpSaturation.value = 50;
	inpLightness1.value = 20;
	inpLightness2.value = 30;
	inpLightness3.value = 50;
	inpLightness4.value = 80;
	inpLightness5.value = 98;
};

TTT.onInput = function() {
	document.documentElement.style.setProperty("--main-hue", 3.6 * parseFloat(inpHue.value));
	document.documentElement.style.setProperty("--saturation", inpSaturation.value + "%");
	document.documentElement.style.setProperty("--lightness1", inpLightness1.value + "%");
	document.documentElement.style.setProperty("--lightness2", inpLightness2.value + "%");
	document.documentElement.style.setProperty("--lightness3", inpLightness3.value + "%");
	document.documentElement.style.setProperty("--lightness4", inpLightness4.value + "%");
	document.documentElement.style.setProperty("--lightness5", inpLightness5.value + "%");

	outHue.innerHTML = (3.6 * inpHue.value).toFixed();
	outSaturation.innerHTML = inpSaturation.value + "%";
	outLightness1.innerHTML = inpLightness1.value + "%";
	outLightness2.innerHTML = inpLightness2.value + "%";
	outLightness3.innerHTML = inpLightness3.value + "%";
	outLightness4.innerHTML = inpLightness4.value + "%";
	outLightness5.innerHTML = inpLightness5.value + "%";

	TTT.setStorageHsl();
};

TTT.setStorageHsl = function() {
	const inputs = Array.from(document.querySelectorAll("details p input"));
	const theme = inputs.map(item => {
		return JSON.parse(`{ "${item.id}": ${item.value} }`);
	});

	localStorage.setItem("theme", JSON.stringify(theme));
};

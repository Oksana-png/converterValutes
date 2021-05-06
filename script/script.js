document.addEventListener("DOMContentLoaded", () => {
  const selectValue = document.querySelector("#valute");

  const dataValute = (callback) => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((responce) => {
        if (responce.status !== 200) {
          throw new Error("status network not 200");
        }
        return responce.json();
      })
      .then((responce) => {
        callback(responce);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const renderExternal = () => {
    const form = document.querySelector(".prev");
    const buttonSubmit = form.querySelector('button[type="submit"]');
    const inputRub = form.querySelector(".start");
    const resultInput = form.querySelector(".conv");

    const returResult = (data) => {
      const rate = data.Valute[selectValue.value].Value;
      resultInput.value = (+inputRub.value / rate).toFixed(2);
    };

    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      if (/[0-9]+/.test(inputRub.value)) {
        dataValute(returResult);
      } else {
        alert("Введите только число!");
      }
    });
  };
  renderExternal();

  const renderRub = () => {
    const form = document.querySelector(".next");
    const buttonSubmit = form.querySelector('button[type="submit"]');
    const inputExt = form.querySelector(".start");
    const resultInput = form.querySelector(".conv");

    const returnResult = (data) => {
      const rate = data.Valute[selectValue.value].Value;
      resultInput.value = (rate * inputExt.value).toFixed(2);
    };

    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      if (/[0-9]+/.test(inputExt.value)) {
        dataValute(returnResult);
      } else {
        alert("Введите только число!");
      }
    });
  };
  renderRub();

  selectValue.addEventListener("change", () => {
    const valuteText = document.querySelectorAll(".name-val");

    const getText = (data) => {
      const rate = data.Valute[selectValue.value];
      console.log(rate);
      valuteText.forEach((item) => {
        item.textContent = `${rate.Name} (${rate.CharCode})`;
      });
    };

    dataValute(getText);
  });
});

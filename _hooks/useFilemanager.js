import { BACK_URL } from "../_constants/URLs";

const useFilemanager = (id, type = "images") => {
  let button = document.getElementById(id);

  button.addEventListener("click", () => {
    const routePrefix = "filemanager";
    const targetInput = document.getElementById(button.getAttribute("data-input"));
    const targetPreview = document.getElementById(button.getAttribute("data-preview"));

    window.open(`${BACK_URL}/${routePrefix}?type=${type}`, "Choose a file", "width=900,height=600");

    window.SetUrl = items => {
      const filePath = items[0].url;

      // set the value of the desired input to image url
      targetInput.value = filePath;
      targetInput.dispatchEvent(new Event("change"));

      // clear previous preview
      targetPreview.innerHTML = "";

      // set or change the preview image src
      items.forEach(item => {
        const img = document.createElement("img");
        img.setAttribute("style", "height: 5rem");
        img.setAttribute("src", item.thumb_url);
        targetPreview.appendChild(img);
      });

      // trigger change event
      targetPreview.dispatchEvent(new Event("change"));
    }
  })
}

export default useFilemanager
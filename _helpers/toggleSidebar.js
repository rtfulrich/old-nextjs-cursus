export const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("init");
  if (sidebar.classList.contains("to-show-sidebar")) {
    sidebar.classList.remove("to-show-sidebar");
    sidebar.classList.add("show");
  }
  else if (sidebar.classList.contains("to-hide-sidebar")) {
    sidebar.classList.remove("to-hide-sidebar");
    sidebar.classList.add("hide");
  }
  else {
    sidebar.classList.toggle("show");
    sidebar.classList.toggle("hide");
  }

  const mainContent = document.getElementById("main-content");
  const mainFooter = document.getElementById("main-footer");
  if (sidebar.classList.contains("show")) {
    mainContent.classList.remove("no-sidebar");
    mainFooter.classList.remove("no-sidebar");
  }
  else {
    mainContent.classList.add("no-sidebar");
    mainFooter.classList.add("no-sidebar");
  }
}
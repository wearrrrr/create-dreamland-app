import "@mercuryworkshop/dreamlandjs";

function App() {
  return (
    <div>
      <h1>Hello, Dreamland!</h1>
    </div>
  )
}

window.addEventListener("load", () => {
  document.body.appendChild(<App />);
});
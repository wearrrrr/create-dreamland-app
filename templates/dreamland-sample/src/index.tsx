import "@mercuryworkshop/dreamlandjs";

const App: Component<{},{
    counter: number
  }> = function() {
  this.counter = 0;
  return (
    <div>
      <h1>Counter</h1>
      <button on:click={() => this.counter++}>Click me!</button>
      <p>
       Count: {use(this.counter)}
      </p>
    </div>
  );
}

window.addEventListener("load", () => {
  document.body.appendChild(<App/>);
});
import { LitElement, css, html, customElement, property } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties in lit-element
  // check out this link https://lit-element.polymer-project.org/guide/properties#declare-with-decorators
  @property() message: string = "";

  @property() w: number = 320;
  @property() h: number = 240;
  @property() pixelWidth: number = 2;
  @property() pixelHeight: number = 2;
  @property() ctx: CanvasRenderingContext2D;
  @property() selectedColor: string = "#000";

  static get styles() {
    return css`
      #mainBlock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      #mainBlock h2 {
        margin-bottom: 0;
      }

      #mainBlock p {
        max-width: 22em;
      }

      #mainBlock img {
        width: 6em;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;
      }

      button {
        cursor: pointer;
      }

      @media(spanning: single-fold-vertical) {
        #mainBlock {
          width: 50%;
        }
      }
    `;
  }

  constructor() {
    super();
    // this.w = 320
    // this.h = 240
    // this.pixelWidth = 1
    // this.pixelHeight = 1
  }

  firstUpdated() {
    // this method is a lifecycle even in lit-element
    // for more info check out the lit-element docs https://lit-element.polymer-project.org/guide/lifecycle
    console.log('This is your home page');
    this.draw()
  }


  handleClick() {
    console.log('handleClick')
  }

  handleChange(e) {
    console.log('handleChange')
    console.log(e)
    // console.log(e.selected)
  }

  // gaussianPrimes() {}

  nicoMachusTheorem(n:number) {
    // let x = 0
    // let y = 0
    // this.ctx.fillStyle = this.selectedColor;

    // for (let i=0; i<=n; i++) {
    // }

  }

  drawSquaresNTo1(n:number) {
    let x = 0
    let y = 0
    this.ctx.fillStyle = this.selectedColor;


    for (let i=0; i<=n; i++) {
      // adjust squares to fit
      let squareWidth = this.w / i
      let squareHeight = this.h / i
      // draw n * n square
      for (let x = 0; x < this.w; x += squareWidth) {
        // vertical square
        this.drawSquare(x, y,  squareWidth, squareHeight, "green")
      }
      // horizontal square
      for (let y = 0; y < this.h; y += squareHeight) {
        this.drawSquare(x, y,  squareWidth, squareHeight, "green")
      }
    }
  }



  sumOfOdd(n:number) {
    // the sum of odd is sqaure : 1 + 3 ... 2n -1
    // sum-of-odd / 2 = n(Left2Center) + n(Center2Bottom)
    // gemoetric prove // 1^2, 3^2 ...
    let x = 0
    let y = 0
    this.ctx.fillStyle = this.selectedColor;


    let squareWidth = this.w / n
    let squareHeight = this.h / n

    // draw n * n square
		for (let x = 0; x < this.w; x += squareWidth) {
      // vertical square
      this.drawSquare(x, y,  squareWidth, squareHeight, "green")
      // horizontal square
      for (let y = 0; y < this.h; y += squareHeight) {
        this.drawSquare(x, y,  squareWidth, squareHeight, "green")
      }
    }

    x = 0
    y = 0
    for (let i=0; i<=n; i++) {
      // draw the sum of Odd
      let sumOfOdds: number = (1 + i) ** 2
      this.drawSquare(x, y,  squareWidth, squareHeight, "yellow")
      this.drawText(x + 12 , y + 20, sumOfOdds.toString(), "orange")
      x += squareWidth
      y += squareHeight
    }

  }

  draw = () => {
    const c =  <HTMLCanvasElement> this.shadowRoot.getElementById('c')
    this.ctx = c.getContext("2d");

    // this.ctx.clearRect(0, 0, this.w, this.h);

		this.ctx.fillStyle = "#FFF";
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.ctx.fillStyle = "#000";

    this.drawGrid()

    // this.sumOfOdd(9)
    // TODO this.nicoMachusTheorem(5)
    this.drawSquaresNTo1(5)

  }


  drawText(x:number, y:number, text:string, fillStyle:string) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillText(text, x, y);
  }

  drawSquare(x:number, y:number, width:number, height:number, fillStyle:string) {
    // this.ctx.fillRect(x * this.pixelWidth, y * this.pixelWidth, width, height);
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fillStyle = fillStyle
    this.ctx.fill();
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawGrid() {
		// if (!this.hasGrid)
		// 	return;
		this.ctx.beginPath();
		// vertical lines
		for (let x = 0.5; x < this.w; x += this.pixelWidth * 2) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.h);
		}
		// horizontal lines
		for (let y = 0.5; y < this.h; y += this.pixelWidth * 2) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.w, y);
		}
		this.ctx.strokeStyle = "#EEE";
		this.ctx.closePath();
		this.ctx.stroke();
  }

  render() {
    return html`
		<div id="mainBlock">
			<canvas @click="${this.handleClick}" id="c" width="320" height="240" style="border:1px solid #ccc"></canvas>
			<canvas id="canvaspreview" width="32" height="24" style="border:1px solid #ccc"></canvas>
      <select @change="${this.handleChange}">
        <option value="drawSquaresNTo1">Draw Squares from n(aside) + 1</option>
        <option value="nicoMachusTheorem">Nico Machus Theorem</option>
        <option value="sumOfOdd">Sum of odd is sqaure</option>
      </select>
      <button @click="${this.draw}">draw</button>
    </div>
    `;
  }
}

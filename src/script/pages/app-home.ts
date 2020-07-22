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
  @property() ctx: CanvasRenderingContext2D;

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
    this.w = 320
    this.h = 240
    this.ctx = null
    this.pixelWidth = 1
    this.pixelHeight = 1
  }

  firstUpdated() {
    // this method is a lifecycle even in lit-element
    // for more info check out the lit-element docs https://lit-element.polymer-project.org/guide/lifecycle
    console.log('This is your home page');
  }


  handleClick() {
    console.log('handleClick')
  }


  sumOfOdd() {

  }

  draw = () => {
    const c = this.shadowRoot.getElementById('c')
    this.ctx = c.getContext("2d");
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawGrid()
  }

  drawGrid() {
		// if (!this.hasGrid)
		// 	return;
		this.ctx.beginPath();
		// vertical lines
		for (var x = 0.5; x < this.w; x += this.pixelWidth) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.h);
		}
		// horizontal lines
		for (var y = 0.5; y < this.h; y += this.pixelWidth) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.w, y);
		}
		this.ctx.strokeStyle = "#eee";
		this.ctx.closePath();
		this.ctx.stroke();
  }

  render() {
    return html`
		<div id="mainBlock">
			<canvas @click="${this.handleClick}" id="c" width="320" height="240" style="border:1px solid #ccc"></canvas>
			<canvas id="canvaspreview" width="32" height="24" style="border:1px solid #ccc"></canvas>
      <button @click="${this.draw}">draw</button>
    </div>
    `;
  }
}
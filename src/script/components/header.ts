import { LitElement, css, html, customElement, property } from 'lit-element';


@customElement('app-header')
export class AppHeader extends LitElement {

  @property({ type: String }) title: string = 'pixmapz';

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        background: var(--app-color-primary);
        color: white;
        height: 4em;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 24px;
        font-weight: normal;
      }

      nav {
        width: 10rem;
        display: flex;
        justify-content: space-between;
      }

      nav a {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>

        <nav>
          <a href="./">Pixmapz</a>
          <a href="./about">About</a>
        </nav>
      </header>
    `;
  }
}
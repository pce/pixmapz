import { LitElement, css, html, customElement } from 'lit-element';


@customElement('app-about')
export class AppAbout extends LitElement {

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'pixmapz',
        text: 'Check out the pixmapz #tbt #pwa-starter',
        url: 'https://github.com/pce/pixmapz',
      })
    }
  }

  render() {
    return html`
      <div>
        <h2>About Page</h2>
        ${'share' in navigator ? html`<button @click="${this.share}">Share this Starter!</button>` : null}
      </div>
    `;
  }
}
import { LitElement, html, css } from 'lit-element';

class TodoCheckbox extends LitElement {
    static get properties() {
        return {
            checked: { type: Boolean },
        };

    }

    constructor() {
        super();
        this.checked = false;
    }

    static get styles() {
        return css`
            /* Customiza o container */
            label {
                display: block;
                position: relative; 
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 22px;

                /* Desabilita seleção de texto */
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            /* Esconde o input */
            label input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

            /* Formata o span para parecer como uma caixa de checkbox */
            label span {
                position: absolute;
                top: 0;
                left: 0;
                height: 25px;
                width: 25px;
                border-radius: 2px;
                background-color: #eee;
            }
            
            /* Colore quando o mouse passar por cima do span */
            label input:hover ~ span {
                background-color: #ccc;
            }

            /* Colore a caixinha (span) quando check */
            label input:checked ~ span {
                background-color: #6c30d6;
            }

            /* Cria o indicador (escondido quando não checkado) */
            span:after {
                content: "";
                position: absolute;
                display: none;
            }

            /* Mostra o indicador quando checkado */
            input:checked ~ span:after {
                display: block;
            }

            /* Formata o indicador */
            span:after {
                left: 9px;
                top: 5px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        `;
    }

    render() {
        return html`
            <label>
               <slot></slot>
                <input 
                  .value="${this.checked}"
                  @change="${this.updateCheck}"
                  type="checkbox">
                <span></span>
            </label>`
    }

    updateCheck(e) {
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', {composed: false, bubbles: true}));
    }
}

customElements.define('todo-checkbox',TodoCheckbox);
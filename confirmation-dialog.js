class ConfirmationDialog extends HTMLElement {
    constructor() {
        super();
        this._modal;
        this._yes;
        this._cancel;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>       
            .click-to-confirm-btn {
                border: none;
                color: blue;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                background-color: gainsboro;
            }   
              
            .modal {
                display: none; 
                position: fixed; 
                z-index: 1; 
                padding-top: 100px; 
                left: 0;
                top: 0;
                width: 100%; 
                height: 100%; 
                overflow: auto; 
                background-color: rgba(0,0,0,0.4); 
            }
            
            .msg-yes, .msg-cancel {
                display: none; 
            }

            /* Modal Content */
            .modal-content {
                position: relative;
                background-color: #fefefe;
                margin: auto;
                padding: 0;
                border: 1px solid #888;
                width: 80%;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);                
            }           

            /* The confirm Button */
            .confirm, .cancel {                                             
                font-weight: bold;
            }

            .confirm:hover,
            .confirm:focus {
                color: green;
                text-decoration: none;
                cursor: pointer;
            }  
            
            /* Cancel button */
            .cancel:hover,
            .cancel:focus {
                color: red;
                text-decoration: none;
                cursor: pointer;
            }          

            .modal-body, .modal-options {
                padding: 2px 16px; 
                margin: 20px 2px;
            }           

        </style>
        <button class="click-to-confirm-btn">Click me</button>
        <div class="modal">
            <div class="modal-content">               
                <div class="modal-body">
                    <slot><slot>
                </div>
                
                <div class="modal-options">
                    <button type="button" class="confirm">Yes</button>                   
                    <button type="button" class="cancel">Cancel</button>                   
                </div>
            </div>
        </div>
        <p class="msg-yes">You just clicked "Yes"</p>    
        <p class="msg-cancel">You just clicked "Cancel"</p>          
        `
    }

    connectedCallback() {
        this._modal = this.shadowRoot.querySelector(".modal");
        this._yes = this.shadowRoot.querySelector(".msg-yes");
        this._cancel = this.shadowRoot.querySelector(".msg-cancel");
        this.shadowRoot.querySelector("button").addEventListener('click', this._showModal.bind(this));
        this.shadowRoot.querySelector(".confirm").addEventListener('click', this._confirmModal.bind(this));
        this.shadowRoot.querySelector(".cancel").addEventListener('click', this._cancelModal.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
        this.shadowRoot.querySelector(".confirm").removeEventListener('click', this._confirmModal);
        this.shadowRoot.querySelector(".cancel").removeEventListener('click', this._cancelModal);
    }

    _showModal() {
        this._modal.style.display = 'block';
    }

    _confirmModal() {
        this._modal.style.display = 'none';
        this._yes.style.display = 'block';
        this._cancel.style.display = 'none';
    }

    _cancelModal() {
        this._modal.style.display = 'none';
        this._yes.style.display = 'none';
        this._cancel.style.display = 'block';
    }
}

customElements.define('confirmation-dialog', ConfirmationDialog);

class ConfirmationDialog extends HTMLElement {
    constructor() {
        super();
        this._modalVisible = false;
        this._modal;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>            
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
        <button>Click me</button>
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
        `
    }

    connectedCallback() {
        this._modal = this.shadowRoot.querySelector(".modal");
        this.shadowRoot.querySelector("button").addEventListener('click', this._showModal.bind(this));
        this.shadowRoot.querySelector(".confirm").addEventListener('click', this._hideModal.bind(this));
        this.shadowRoot.querySelector(".cancel").addEventListener('click', this._hideModal.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
        this.shadowRoot.querySelector(".confirm").removeEventListener('click', this._hideModal);
        this.shadowRoot.querySelector(".cancel").removeEventListener('click', this._hideModal);
    }

    _showModal() {
        this._modalVisible = true;
        this._modal.style.display = 'block';
    }

    _hideModal() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
    }
}
customElements.define('confirmation-dialog', ConfirmationDialog);

class BlueshiftCapital extends HTMLElement {
    constructor() {
        super();
        console.log("capital");
        this.props = this.getProps();
        console.log("PROPS", this.props);
    }
    getMultiplierHtml() {
        const selectEl = document.createElement("select");
        selectEl.classList.add("blueshift-capital");
        const { maxMultiplier } = this.props;
        for (let i = 1; i <= maxMultiplier; i++) {
            const optionEl = document.createElement("option");
            optionEl.textContent = i * 1000;
            optionEl.value = i;
            optionEl.classList.add("option");
            selectEl.appendChild(optionEl);
        }
        selectEl.value = 1;
        return selectEl;
    }
    connectedCallback() {
        // const shadow = this.attachShadow({ mode: "open" });
        // const span = document.createElement("span");
        // span.textContent = "Shadow DOM";
        const style = document.createElement("style");
        style.textContent = `
            option {
                font-size: var(--font-size-large);
            } 
        `
        let typeEl;
        switch(this.props.type) {
            case "multiplier":
                typeEl = this.getMultiplierHtml();
        }
        // shadow.appendChild(style);
        // shadow.appendChild(typeEl);
        if (this.props.useShadow) {
            const shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(style);
            shadow.appendChild(typeEl);

            return;
        }
        this.appendChild(typeEl);
    }
    getProps() {
        const type = this.dataset["type"];
        const maxMultiplier = this.dataset["maxMultiplier"];
        const useShadow = this.dataset["useShadow"];
        return {
            type,
            maxMultiplier,
            useShadow: useShadow === "true"
        }
    }
}


customElements.define("blueshift-capital", BlueshiftCapital);

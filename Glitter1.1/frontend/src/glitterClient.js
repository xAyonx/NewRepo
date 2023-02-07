var Glitt = /** @class */ (function () {
    function Glitt(data) {
        this.id = data.id;
        this.user = data.user;
        this.text = data.text;
        this.datetime = new Date(data.datetime).toLocaleDateString() + " " + new Date(data.datetime).toLocaleTimeString();
    }
    return Glitt;
}());
function renderCard(glitt) {
    return "\n    <div class=\"uk-card uk-card-default uk-width-1-2@m gl-container-center\" style=\"margin-bottom: 30px;\">\n        <div class=\"uk-card-header\">\n            <div class=\"uk-grid-small uk-flex-middle\" uk-grid>\n                <div class=\"uk-width-auto\">\n                    <img class=\"uk-border-circle\" width=\"40\" height=\"40\" src=\"https://i.pravatar.cc/40\" alt=\"Avatar\">\n                </div>\n                <div class=\"uk-width-expand\">\n                    <h3 class=\"uk-card-title uk-margin-remove-bottom\">".concat(glitt.user, "</h3>\n                    <p class=\"uk-text-meta uk-margin-remove-top\"><time>").concat(glitt.datetime, "</time></p>\n                </div>\n            </div>\n        </div>\n        <div class=\"uk-card-body\">\n            <p>").concat(glitt.text, "</p>\n        </div>\n    </div>\n    ");
}
function displayGlitts(glitts) {
    glitts
        .map(function (glitt) { return renderCard(glitt); })
        .forEach(function (glitt) { return (document.getElementById("gl-card-container").innerHTML += glitt); });
}
/**
 * Handles the onClick event of the save button when creating a new Glitt.
 *
 */
function saveGlitt() {
    var glittText = document.getElementById("gl-glitt-text").value;
    var glittName = document.getElementById("gl-glitt-name").value;
    postGlittToBackend(glittName, glittText);
}
function resetForm() {
    var glittText = document.getElementById("gl-glitt-text").value = " ";
    var glittName = document.getElementById("gl-glitt-name").value = " ";
}
function hideModal() {
    var modalElement = document.getElementById("gl-create-glitt-modal");
    /*UIkit.modal(modalElement).hide();*/
}
/**
 * This function fetches the data from the backend.
 *
 */
function getGlittsFromBackend() {
    fetch("http://localhost:4000/glitts")
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var glitts = json.map(function (glitt) { return new Glitt(glitt); });
        displayGlitts(glitts);
    });
}
function postGlittToBackend(glittName, glittText) {
    var fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: glittName,
            text: glittText,
            datetime: new Date()
        })
    };
    fetch("http://localhost:4000/glitts", fetchConfig)
        .then(function (res) {
        if (res.status === 201) {
            /* UIkit.notification({
                 message: "Glitt created!",
                 status: "success",
                 pos: "bottom-center",
                 timeout: 3_000
             });
          
         */ }
        resetForm();
        getGlittsFromBackend();
        hideModal();
    });
}
/// MAIN
getGlittsFromBackend();

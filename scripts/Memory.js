function Memory (elementId, images) {
    this.images = images;
    this.index = 0;
    this.game = document.getElementById(elementId);

    this.createBoard();
}

Memory.prototype.createBoard = function() {
    for (var i = 0; i < this.images.length; i++) {
        this.createCard(this.images[i].src); // on crée une paire d'images
        this.createCard(this.images[i].src);
    }
}

Memory.prototype.createCard = function(src) {
    var image = document.createElement('img');
    image.src = src;
    image.height = 150;

    this.game.appendChild(image);
}
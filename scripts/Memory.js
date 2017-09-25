function Memory (elementId, images) {
    this.images = images.concat(images); // duplication de toutes les images
    this.index = 0;
    this.element = document.querySelector('#' + elementId);



    this.launchGame();
}

Memory.prototype.launchGame = function() {
    this.element.innerHTML = '';

    this.shuffle();
    this.revealed = []; // 0 à 2 images
    this.found = []; // 0 à toutes les images ()
    this.createBoard();
}

Memory.prototype.createBoard = function() {
    var div = document.createElement('div');
    div.className = 'congratulations hidden';
    div.innerText = 'Bravo !';

    var button = document.createElement('button');
    button.innerText = 'Rejouer';
    button.onclick = this.launchGame.bind(this);

    div.appendChild(button);

    this.element.appendChild(div);

    for (var i = 0; i < this.images.length; i++) {
        this.createCard(this.images[i]);
    }

    // this.images.forEach(this.createImage.bind(this)); // équivalent au for
}

Memory.prototype.createCard = function(src) {
    var p = document.createElement('p');
    p.onclick = this.reveal.bind(this);

    var img = document.createElement('img');
    img.src = src;
    img.height = 150;
    img.width = 150;
    img.className = 'hidden';

    p.appendChild(img);
    this.element.appendChild(p);
}

Memory.prototype.shuffle = function() {
/*    var shuffled = [];
    var indexes = [];
    do {
        var random = Math.floor(Math.random() * this.images.length);
        if (indexes.indexOf(random) === -1) {
            shuffled.push(this.images[random]);
            indexes.push(random);
        }
    } while (this.images.length > shuffled.length)

    this.images = shuffled;*/

    var j;
    var k;
    for (var i = this.images.length - 1; i >= 0; i--) {
        // génère un nombre aléatoire entre 0 et i
        j = Math.floor(Math.random() * i);
        
        // récupère l'image courante
        k = this.images[i];

        // permute l'image courante et l'image d'index j
        this.images[i] = this.images[j];
        this.images[j] = k;
    }
}

Memory.prototype.reveal = function(ev) {
    ev.stopPropagation();
    
    if (this.revealed.length === 2) return; // early return

    var p = ev.target;
    var img = p.querySelector('img');
    img.className = '';
    this.revealed.push(img); // ajout de l'élément html à revealed
    
    this.checkFound();
    
    // si les images sont différentes, on les cache après 1 seconde
    if (this.revealed.length === 2) {
        setTimeout(this.hide.bind(this), 1000);
    }
}

Memory.prototype.checkFound = function() {
    if (this.revealed.length < 2) return;
    
    // si les sources des 2 images retournées sont identiques
    if (this.revealed[0].src === this.revealed[1].src) {
        this.found.push(this.revealed[0], this.revealed[1]);
        this.revealed = [];
    }

    // si toutes les paires sont trouvées
    if (this.found.length === this.images.length) {
        this.element.querySelector('.congratulations').className = 'congratulations';
    }
}

Memory.prototype.hide = function() {
    this.revealed.forEach(function(image) {
        image.className = 'hidden';
    });
    this.revealed = []
}
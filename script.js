document.querySelector('.control-buttons span').onclick = function(){
    let yourNema = prompt('ماهو أسمك ؟');
    var auio = new Audio();
    auio.src='sound8.mp3'
    if(yourNema == null || yourNema == ""){
        document.querySelector(".name span").innerHTML = "الاسم غير معروف :(";
    }else{
        document.querySelector(".name span").innerHTML = yourNema;
        auio.play()
    }
    document.querySelector('.control-buttons').remove();
    revealBlocks();
};


let duration = 1000;
let blocksContainer = document.querySelector('.spacetoon-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());
shuffla(orderRange);
blocks.forEach((block, index) =>{
    
    block.style.order = orderRange[index];
    block.addEventListener('click', function(){
        flipBlock(block)
    })

});

function flipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

    if(allFlippedBlocks.length === 2){

        stopClicking();

        checkmatchedBlooks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

function checkmatchedBlooks(firstBolck, secondBlock){
     let triesElement = document.querySelector('.tries span');
     if(firstBolck.dataset.spacetoon === secondBlock.dataset.spacetoon){

        firstBolck.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');


        firstBolck.classList.add('has-match');
        secondBlock.classList.add('has-match');

     }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        errorCount =  triesElement.innerHTML;
        // تغيير لون
        if (errorCount > 15) {
            triesElement.style.color = '#C51605'; // تغيير لون الأخطاء إلى الأحمر
        } else if(errorCount > 10){
            triesElement.style.color = 'red'; // إعادة تعيين لون الأخطاء إلى اللون الأساسي (ربما الأسود)

        }else
         {
            triesElement.style.color = '#FFB000'; // إعادة تعيين لون الأخطاء إلى اللون الأساسي (ربما الأسود)
        }

            setTimeout(() => {

                firstBolck.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
        

            }, duration);
     }
}

function revealBlocks() {
    blocks.forEach((block) => {
        block.classList.add('is-flipped');
    });

    setTimeout(() => {
        blocks.forEach((block) => {
            block.classList.remove('is-flipped');
        });
    }, 700);
}

function shuffla(array){
    let current = array.length,
    temp,
    random;
    while (current > 0){
        random = Math.floor(Math.random() * current)
        current --;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array
}
$(function () {
    var pet_info = { name: "Matt", weight: 5, happiness: 5, health: 5 };
    let petIsDead = false;
    
    $(".treat-button, .play-button, .exercise-button, .sleep-button").prop("disabled", true);

    $(".treat-button").click(function () {
        pet_info.happiness += 2;
        pet_info.weight += 1;
        pet_info.health -= 1;

        showNotification(`You gave ${pet_info.name} a treat!`);
        spawnEffect("🍖");
        checkAndUpdatePetInfoInHtml();
    });

    $(".play-button").click(function () {
        pet_info.happiness += 3;
        pet_info.weight -= 1;
        pet_info.health += 1;

        $(".pet-image").addClass("jump");
        setTimeout(() => $(".pet-image").removeClass("jump"), 600);

        showNotification(`You played with ${pet_info.name}!`);
        checkAndUpdatePetInfoInHtml();
    });

    $(".exercise-button").click(function () {
        pet_info.happiness -= 2;
        pet_info.weight -= 1;
        pet_info.health += 1;

        $(".pet-image").addClass("rotate");
        setTimeout(() => $(".pet-image").removeClass("rotate"), 600);

        showNotification(`${pet_info.name} exercised!`);
        checkAndUpdatePetInfoInHtml();
    });

    $(".sleep-button").click(function () {
        pet_info.happiness += 1;
        pet_info.health += 1;

        spawnEffect("💤");
        showNotification(`${pet_info.name} is sleeping...`);
        checkAndUpdatePetInfoInHtml();
    });

    // Reset button handler
    $(".reset-button").click(function () {
        pet_info = { name: "Matt", weight: 5, happiness: 5, health: 5 };
        petIsDead = false;

        $(".death-notification").hide();
        $(".reset-button").hide();

        updatePetInfoInHtml();

        $(".treat-button, .play-button, .exercise-button, .sleep-button")
            .prop("disabled", false);
    });

    $(".start-button").click(function () {
        pet_info = { name: "Matt", weight: 5, happiness: 5, health: 5 };
        petIsDead = false;

        updatePetInfoInHtml();

        $(".treat-button, .play-button, .exercise-button, .sleep-button")
            .prop("disabled", false);

        $(".start-button").hide();
    });

    function spawnEffect(content) {
        var effect = $('<div class="effect"></div>').text(content);

        // prepend() : Using prepend here inserts the 'effect' element before any content within .pet-image-container
        $(".pet-image-container").prepend(effect);

        // remove() ; Using remove here deletes this 'effect' element from the document
        effect.animate({ top: "-=60px", opacity: 0 }, 800, function () {
            effect.remove();
        });
    }

    function checkAndUpdatePetInfoInHtml() {
        if (pet_info.weight < 0) pet_info.weight = 0;
        if (pet_info.happiness < 0) pet_info.happiness = 0;
        if (pet_info.health < 0) pet_info.health = 0;
        updatePetInfoInHtml();
    }

    function updatePetInfoInHtml() {
        $(".name").text(pet_info.name);
        $(".weight").text(pet_info.weight);
        $(".happiness").text(pet_info.happiness);
        $(".health").text(pet_info.health);

        checkIfDead();
    }

    function showNotification(text) {
        const notif = $('.action-notification');
        notif.text(text).stop(true, true).fadeIn(0).fadeOut(1500);
    }

    function checkIfDead() {
        if (!petIsDead && (pet_info.happiness === 0 || pet_info.weight === 0 || pet_info.health === 0)) {
            
            petIsDead = true;

            let cause = "";
            if (pet_info.weight === 0)      cause = "starvation";
            else if (pet_info.happiness === 0) cause = "depression";
            else if (pet_info.health === 0) cause = "poor health";


            $(".death-notification")
                .text(`${pet_info.name} has died from ${cause} 💀`)
                .fadeIn(500);

            $(".treat-button, .play-button, .exercise-button, .sleep-button")
                .prop("disabled", true);

            $(".reset-button").fadeIn(300);
            $(".start-button").hide();
        }
    }
});

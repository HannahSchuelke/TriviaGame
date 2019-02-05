// run after Javascript is loaded
$('document').ready(function () {

    let numCorrect = 0;
    let timeVar;

    // Questions & Answers
    var minnesotaQuestions = [
         {
            Question: "How many lakes does Minnesota really have??",
            PossibleAnswers: ['10,000', '12,523', '15,291'],
            flags: [false, false, true],            
            Answer: '15,291'
        },
         {
            Question: "What U.S. fashion craze started in a Roseville, Minnesota, gym in 1988?",
            PossibleAnswers: ['Slap bracelets', 'Zubaz pants', 'Acidwash jeans'],
            flags: [false, true, false],
            Answer: 'Zubaz pants'
        },
        {
            Question: "Which of Minnesota's 67 state parks is the most visited?",
            PossibleAnswers: ['Gooseberry Falls', 'Fort Snelling', 'Itasca'],
            flags: [false, true, false],
            Answer: 'Fort Snelling'
        },
         {
            Question: "On what Minnesota lake was water skiing invented in 1922?",
            PossibleAnswers: ['Lake Pepin, by Ralph Samuelson', 'Lake Minnetonka, by Lief Norman', 'White Bear Lake, by Leon Anderson'],
            flags: [true, false, false],
            Answer: 'Lake Pepin, by Ralph Samuelson'
        },
         {
            Question: "Who was the first woman to represent Minnesota in the U.S. Congress?",
            PossibleAnswers: ['Muriel Humphrey Brown, 1978', 'Virginia Paul Holm, 1952', 'Coya Knutson, 1954'],
            flags: [false, false, true],
            Answer: 'Coya Knutson, 1954'
        }
    ];

    function createQuestionDOM(array){
        let formDiv = $("<form>");       

        for(let i = 0; i < array.length; i++){        
           
            let questionText = array[i].Question;
            console.log("Question Text: " + questionText);

            let questionTitle = $("<p>");
            questionTitle.text(questionText);

            for(let y = 0; y < array[i].PossibleAnswers.length; y++){
                
                let answerChoice = $("<input type='radio' name='question-" + i +
                "' value='" + array[i].PossibleAnswers[y] + "''>");                
                questionTitle.append("<br>");
                questionTitle.append(answerChoice);               
                questionTitle.append(`<div>${array[i].PossibleAnswers[y]}</div>`);
            }

            formDiv.append("<hr>");
            formDiv.append(questionTitle);
        }

        $("#questionHolder").append(formDiv);
        $("#questionHolder").append(`<button id="checkAnswer">Submit</button>`);

    }

    

    function checkAnswers(){
        clearTimeout(timeVar);
        for(let i = 0; i < $("input").length; i++){
            $.each($("input[name='question-" + i + "']:checked"), function(){
                console.log($(this).val());
                if($(this).val() === minnesotaQuestions[i].Answer){
                    numCorrect++;
                }                
            });
        }
        alert("You got " + numCorrect + " questions correct!");
    }

    

    function timer(timeLeft){
        timeVar = setTimeout(function(){
            $("#timer").text("You have " + timeLeft + " seconds left!");

            if(timeLeft > 0){
                timeLeft--;
               return timer(timeLeft);
            }

            clearTimeout(timeVar);
            alert("You ran out of time!");
            checkAnswers();
        }, 1000);
    }


    // click events: 

    // starts game
    $("#start").on("click", function(){
        createQuestionDOM(minnesotaQuestions);
        timer(30);
    });

    // submit answers
    $("#questionHolder").on("click", "#checkAnswer", checkAnswers);



});
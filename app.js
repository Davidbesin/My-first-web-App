let bonnieBlue = false;
var bonnieBluePositive = document.getElementById("bonnieBluePositive");
var bonnieblueNegative = document.getElementById("bonnieBlueNegative");

var input, message, value;

function ToggleBonnieBlue()
{
    console.log("work0");
    if (bonnieBlue)
    {
        bonnieBlue = false;
        bonnieBluePositive.style.display = "none";
        bonnieblueNegative.style.display = "block";
    }
    else
    {
        bonnieBlue = true;
        bonnieBluePositive.style.display = "block";
        bonnieblueNegative.style.display = "none";
    }
}

function CheckInput(inputId, messageId, correctAnswer)
{
    input = document.getElementById(inputId);
    message = document.getElementById(messageId);
    value = input.value.trim();

    // Only whole numbers count as integers
    if (!/^-?\d+$/.test(value))
    {
        message.textContent = "Please enter a whole number, not text.";
        message.style.color = "orange";
        return;
    }

    if (parseInt(value, 10) === correctAnswer)
    {
        message.textContent = "Correct!";
        message.style.color = "green";
    }
    else
    {
        message.textContent = "Wrong, try again.";
        message.style.color = "red";
    }
}

function CheckAnswers()
{
    CheckInput("question1", "message1", 8);
    CheckInput("question2", "message2", 1);
}


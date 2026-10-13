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

function LoadRepos()
{
    var list = document.getElementById("repoList");

    fetch("https://api.github.com/users/Davidbesin/repos?sort=updated&per_page=10")
        .then(function (response)
        {
            if (!response.ok)
            {
                throw new Error("GitHub returned " + response.status);
            }
            return response.json();
        })
        .then(function (repos)
        {
            repos.forEach(function (repo)
            {
                var date = new Date(repo.created_at).toLocaleDateString("en-GB",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

                var description = repo.description ? repo.description : "no description yet";
                var language = repo.language ? repo.language : "an unspecified language";

                var item = document.createElement("li");
                item.textContent = repo.name + " was created on " + date +
                    ". It is about: " + description +
                    ". The main language is " + language + ".";
                list.appendChild(item);
            });
        })
        .catch(function (error)
        {
            list.textContent = "Could not load projects right now.";
            console.error("API error:", error);
        });
}

LoadRepos();
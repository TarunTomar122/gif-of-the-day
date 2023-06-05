window.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('loader');
    var fortuneContainer = document.querySelector('p');

    // Show the loader
    loader.classList.remove('hidden');


    // Check if a GIF is already stored in local storage for the current day
    const storedGif = localStorage.getItem('selectedGif');
    const currentDate = new Date().toLocaleDateString();

    console.log(currentDate);

    if (storedGif && localStorage.getItem('selectedDate') === currentDate) {
        // A GIF is already stored for the current day, use the stored GIF
        // const gifContainer = document.getElementById("gif-container");
        // gifContainer.innerHTML = `<img src="${storedGif}" alt="Random GIF">`;
        const giphyElement = document.getElementById('gifphy');
        giphyElement.src = storedGif
        var loader = document.getElementById('loader');
        loader.classList.add('hidden');
        const shareButton = document.getElementById("share-button");
        shareButton.disabled = false;
    } else {
        // Fetch a new random GIF
        generateFortune();
    }


    // Simulate an asynchronous operation
});




function generateFortune() {
    // const fortunes = [
    //     "You will have great success in the near future.",
    //     "Beware of unexpected challenges ahead.",
    //     "A new opportunity will arise soon.",
    //     "Your hard work will pay off.",
    //     "Take a risk, and you will be rewarded.",
    //     "Good fortune will come to you in unexpected ways.",
    //     "Your creativity will lead you to success.",
    //     "Your determination will overcome any obstacles.",
    //     "Trust your instincts; they will guide you well.",
    //     "You will find happiness in the simplest things.",
    // ];

    // const fortuneDisplay = document.getElementById("fortune");
    // const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    // fortuneDisplay.innerText = `${randomFortune}`;

    fetchGif();

}

async function fetchGif() {
    const prompts = [
        "When you wake up and realize it's still not the weekend",
        "When your alarm goes off and you contemplate your life choices",
        "When you successfully make it to work without spilling your coffee",
        "When you see a cute dog on your way to work",
        "When your coworker tells a hilarious joke during a meeting",
        "When you find out there's free food in the office",
        "When you finish a task and realize it's only 10 a.m.",
        "When you accidentally send a message to the wrong person",
        "When your favorite song comes on and you can't help but dance",
        "When you remember it's Friday and the weekend is near",
        "When you conquer a challenging task and feel like a superhero",
        "When you find a hidden stash of snacks in your drawer",
        "When you realize you've been talking to yourself all along",
        "When you successfully fix a technology issue on your own",
        "When you discover a new meme and can't stop laughing",
        "When you're craving pizza and it magically appears for lunch",
        "When you receive a compliment from your boss",
        "When you spot a sale and find the perfect item",
        "When you successfully avoid an awkward conversation",
        "When you accidentally send a funny GIF to your boss",
        "When you find the perfect meme that perfectly describes your day",
        "When you're about to leave work and get hit with more tasks",
        "When you remember you have leftover cake waiting for you at home",
        "When you get a burst of energy and become super productive",
        "When you successfully parallel park on the first try",
        "When you spot your favorite celebrity in public",
        "When you receive a surprise package in the mail",
        "When you successfully catch something you dropped",
        "When you make an amazing comeback during an argument",
        "When you find out your favorite show is getting a new season",
        "When you finish work early and have the whole evening to yourself",
        "When you meet up with friends and share hilarious stories",
        "When you remember a funny childhood memory and can't stop laughing",
        "When you find money you forgot you had in your pocket",
        "When you finally get the punchline of a joke someone told hours ago",
        "When you successfully navigate through a crowded place",
        "When you remember you have a coupon for your favorite restaurant",
        "When you finally solve a problem you've been struggling with",
        "When you get a good parking spot right in front of your destination",
        "When you realize you have the whole weekend to relax and unwind",
        "When you see your favorite food being served at a party",
        "When you find the perfect gif to express your emotions",
        "When you realize it's a holiday and you don't have to work",
        "When you finish a book and it has an amazing ending",
        "When you receive unexpected praise for your work",
        "When you successfully avoid stepping on a puddle in your new shoes",
        "When you remember a funny meme and burst into laughter",
        "When you discover a new funny TV show and binge-watch it",
        "When you finally catch up on sleep and wake up feeling refreshed"
    ];


    let tag = prompts[Math.floor(Math.random() * prompts.length)]
    const apiKey = "ZQW4dRip11ZhzYsOFSi9HtOLsbzmxMBd";
    const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const gifUrl = data.data.url;
        console.log(`GIF URL: ${gifUrl}`)
        const giphyElement = document.getElementById('gifphy');
        // Extract the code from the Giphy URL
        const regex = /\/([\w-]+)$/; // Regular expression to match the code at the end of the URL
        const match = gifUrl.match(regex);
        const code = gifUrl.substring(gifUrl.lastIndexOf('-') + 1);
        giphyElement.src = "https://giphy.com/embed/" + code
        var loader = document.getElementById('loader');
        loader.classList.add('hidden');

        const shareButton = document.getElementById("share-button");
        shareButton.disabled = false;

        // const promptP = document.getElementById("prompt");
        // promptP.innerHTML = tag;

        const currentDate = new Date().toLocaleDateString();
        // Store the selected GIF and current date in local storage
        localStorage.setItem('selectedGif', "https://giphy.com/embed/" + code);
        localStorage.setItem('selectedDate', currentDate);


    } catch (error) {
        console.log("Error fetching GIF:", error);
    }
}

// Share the random GIF
function shareGif() {
    // Retrieve the URL of the random GIF
    const gifUrl = "https://example.com/random-gif.gif";

    // Use the Web Share API to share the GIF
    navigator.share({
        url: gifUrl
    })
        .then(() => console.log("GIF shared successfully"))
        .catch((error) => console.error("Error sharing GIF:", error));
}

// Event listener for the share button
const shareButton = document.getElementById("share-button");
shareButton.addEventListener("click", shareGif);
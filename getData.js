export default async function handler(req, res) {
    // Call your PHP script using fetch
    console.log("hej");
    const response = await fetch("/backend/phpScripts/getData.php");
    const data = await response.json();

    console.log(data);
    // Send the data as a JSON response
    res.status(200).json(data);
}

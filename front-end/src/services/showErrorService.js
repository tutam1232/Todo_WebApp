async function showErrorService(result) {

    let resultJSON = await result.json();
    if (resultJSON.message)
        alert(resultJSON.message);
    else
        alert("[unknown error]");
}

export default showErrorService;
document.getElementById('runCodeBtn').addEventListener('click', async () => {
    const code = document.getElementById('code').value;

    const url = 'https://java-code-compiler.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '6d319f9734mshb5c51113db9cf5dp1b7510jsn35df3436eaf3',
            'x-rapidapi-host': 'java-code-compiler.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: code,
            version: 'latest'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        document.getElementById('output').textContent = `Output: ${result.output}\nCPU Time: ${result.cpuTime}\nMemory: ${result.memory}`;
    } catch (error) {
        document.getElementById('output').textContent = `Error: ${error}`;
    }
});

async function getMyIP() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  document.getElementById('ipInput').value = data.ip;
  getIPDetails(); // Auto fetch details
}

async function getIPDetails() {
  const ip = document.getElementById('ipInput').value.trim();
  if (!ip) {
    alert("Please enter an IP address!");
    return;
  }

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();

  if (data.status === "fail") {
    document.getElementById('result').innerHTML = `<p style="color:red;">Error: ${data.message}</p>`;
    return;
  }

  document.getElementById('result').innerHTML = `
    <h3>Details for IP: ${data.query}</h3>
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>ISP:</strong> ${data.isp}</p>
    <p><strong>Latitude:</strong> ${data.lat}</p>
    <p><strong>Longitude:</strong> ${data.lon}</p>
    <p><strong>Timezone:</strong> ${data.timezone}</p>
    <a href="https://maps.google.com/?q=${data.lat},${data.lon}" target="_blank">📍 View on Map</a>
  `;
}

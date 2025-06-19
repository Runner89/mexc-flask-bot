import time
import requests

def ping_mexc(repeats=5):
    url = "https://api.mexc.com/api/v3/time"
    latencies = []
    for i in range(repeats):
        start = time.time()
        try:
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                latency = (time.time() - start) * 1000
                latencies.append(latency)
                print(f"Ping {i + 1}: {latency:.2f} ms")
            else:
                print(f"Fehler: Status Code {res.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
    if latencies:
        avg = sum(latencies) / len(latencies)
        print(f"\n✅ Durchschnittliche Latenz: {avg:.2f} ms")
    else:
        print("\n❌ Keine erfolgreiche Verbindung zu MEXC.")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

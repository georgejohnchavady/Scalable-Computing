         ___        ______     ____ _                 _  ___  
        / \ \      / / ___|   / ___| | ___  _   _  __| |/ _ \ 
       / _ \ \ /\ / /\___ \  | |   | |/ _ \| | | |/ _` | (_) |
      / ___ \ V  V /  ___) | | |___| | (_) | |_| | (_| |\__, |
     /_/   \_\_/\_/  |____/   \____|_|\___/ \__,_|\__,_|  /_/ 
 ----------------------------------------------------------------- 


Hi there! Welcome to AWS Cloud9!

To get started, create some files, play with the terminal,
or visit https://docs.aws.amazon.com/console/cloud9/ for our documentation.

Happy coding!

SCGroup19:~/environment/body3RetinalImplantSensor $ aws iot create-thing --thing-name body3RetinalImplantSensor
{
    "thingArn": "arn:aws:iot:eu-west-1:543164014192:thing/body3RetinalImplantSensor", 
    "thingName": "body3RetinalImplantSensor", 
    "thingId": "554d7fe6-28fe-48e4-b347-2e9a88c73530"
}
SCGroup19:~/environment/body3RetinalImplantSensor $ aws iot create-keys-and-certificate --set-as-active --certificate-pem-outfile certificate.pem.crt --private-key-outfile private.pem.key
{
    "certificateArn": "arn:aws:iot:eu-west-1:543164014192:cert/99e0367463786c967a8454a44786e1512e8588b55cec7ee44a2a41d30b10628c", 
    "certificatePem": "-----BEGIN CERTIFICATE-----\nMIIDWTCCAkGgAwIBAgIUCFVRTfYyElbL+MlZZiZ4FRhAiRowDQYJKoZIhvcNAQEL\nBQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g\nSW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTE5MTExOTIwMzgz\nOVoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0\nZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKPxkzSnhaWw9SEa5KQn\nHzjr6AjINfpmgyZEE+oIbu3BKu1HVk01ltUhZbXnnTs5C/1+ANfbliY4VMfbGdx1\nJJ041egu4F2oxjzcu7t2SysYz9bifYyino8i2A9FbBBX3SUpAJ8frJjS+XveZOIF\nr+UjPYpyuF2I5TnXcaTQ+bOONfeC60+T94xaTTfC2pclAVU1lS6aYVCyHp6agvV8\nLdeWfW8T7wdXjvoIjImpa9cH8vcF4av5scHcYqXMifWSk9thhc3NyGQWRcBcnxDa\np1MOgTgjXM9BY9B951S9gkGc6rfDDhAEiSaMGtJZccn3QCykFPyHE4oJiSWq1r7T\ntkkCAwEAAaNgMF4wHwYDVR0jBBgwFoAUXtf3A19iZyPg+DwPktWsiiVpOu0wHQYD\nVR0OBBYEFDkTmNInWB/Hd28WQSGbSleWsgeVMAwGA1UdEwEB/wQCMAAwDgYDVR0P\nAQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQBDjqhvkNRbt/Gpn4qqaqY0E4I7\nW8zvVO1qYra6KuvfufeRXD1VX5jJox6vMMrzNMA3EmA2uo+5LF1eDhJv2HodXIZS\nqsP8zZXrmhYESB6St62h0LrBCAPZ7D50KHekf39ZZjB+qVQlAFGER1TWucGFOMtM\nFwdc1k+Ra7rWBQO8qZQZVNlpN91Yi2m+73D9Q6App7vZTVSnHFHQOgzHH0hCN6SB\nvcqGO4IwrmX6KcNHgSWjW7B36aA6GYkf1BJGbfPvBIsJwHEyQs1wyTcqjH/gIfBJ\nXC3aILsWtL+zjjDfpdObv3Resds1SOX2Al0nl6scZrxVE4BuWAvrmC8uwugy\n-----END CERTIFICATE-----\n", 
    "keyPair": {
        "PublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo/GTNKeFpbD1IRrkpCcf\nOOvoCMg1+maDJkQT6ghu7cEq7UdWTTWW1SFlteedOzkL/X4A19uWJjhUx9sZ3HUk\nnTjV6C7gXajGPNy7u3ZLKxjP1uJ9jKKejyLYD0VsEFfdJSkAnx+smNL5e95k4gWv\n5SM9inK4XYjlOddxpND5s44194LrT5P3jFpNN8LalyUBVTWVLpphULIenpqC9Xwt\n15Z9bxPvB1eO+giMialr1wfy9wXhq/mxwdxipcyJ9ZKT22GFzc3IZBZFwFyfENqn\nUw6BOCNcz0Fj0H3nVL2CQZzqt8MOEASJJowa0llxyfdALKQU/IcTigmJJarWvtO2\nSQIDAQAB\n-----END PUBLIC KEY-----\n", 
        "PrivateKey": "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAo/GTNKeFpbD1IRrkpCcfOOvoCMg1+maDJkQT6ghu7cEq7UdW\nTTWW1SFlteedOzkL/X4A19uWJjhUx9sZ3HUknTjV6C7gXajGPNy7u3ZLKxjP1uJ9\njKKejyLYD0VsEFfdJSkAnx+smNL5e95k4gWv5SM9inK4XYjlOddxpND5s44194Lr\nT5P3jFpNN8LalyUBVTWVLpphULIenpqC9Xwt15Z9bxPvB1eO+giMialr1wfy9wXh\nq/mxwdxipcyJ9ZKT22GFzc3IZBZFwFyfENqnUw6BOCNcz0Fj0H3nVL2CQZzqt8MO\nEASJJowa0llxyfdALKQU/IcTigmJJarWvtO2SQIDAQABAoIBAHRvMN43kAqyWBYv\n9GzFQD58BSqfjv6M6d42gXI4lRgUlfk5Lgjd44bxFjyQB7I0/NgHMnAcC1KPtV7P\ntFlHdT6YTAt/p2e9YzV8i3RDOnWcRJhX+VT1dekwlQSbiHk+/dfTfBaHN1y+keOw\nejOwWFFDqwR2H4yGmk5vPc4RgRZM6b1TJLUk9E/7emYr/JVN/zTex3g9AweOUufq\nAjWA2fxN2g4hzg7TD5sfsF45lLNleeGwZk2eg+pou5HzKAmkNJaxwGGQbYlcp1cK\nXiugahthNG+06UXmr4KNmcxfSw6YwlpsHA+4p8rLrY+6gOnmAnRxsuDORQUM3nbY\n7l53wBECgYEA1Pu7rLRy9R+/pJxWp7HqY9d8yLMR4OkO2LvVUCaXXP1hz8jUPv1Z\n0voUPQdCswtAuipOkhIEfNB+LSGSau1Fxbi1b8167g4xI42cFMjlWvncHm7j+yn3\nVv/wknEjnW6G42mEJx3nm5oEtRxVEd200BADmrXkbEMcD6f9RTfdj/0CgYEAxQ5A\n7XTjkNwGfv7iLSKg3SerCSdO6Lc6JHXviu7G/IFkTSJyPjvkectuxaaoa5/4JLDJ\nBWqkUfCF3rugBVIe0tEIdXxn6Xpz7uEBpKSTbR5uul0s1HGd0bF55eGyl5wi0mqH\nqkleDoZYILzzydtyP3pUl3TYk7CKT6/DywGNMz0CgYEAkQ/n8qhxB+2Y3OgyyUMP\nrvMNJbF5guOZ3hqJHm86dvaJkTlq/oAWlvEHqc1xK3uFmYbJPwoQjmZ/GgQcssFq\n3VGCGmUszklSRLHl1e5C8OTvfLbwhpg9w77MvyFaLZcjPm8WuIHQxxVvEV/7vRBx\nX6kYm14591b6HNvBUEzNlo0CgYEAm7fozPzau+VzaLXoa7x6nGk1enVKoRHx61Ab\nLJIGQxHI/j9jQhS4NxrwfVZ2rx3pzKy7HgGoumu0jk98Y9gCLZwr8BOQVeuDY9kB\nIGdBbTBoVfM9cuAZ09RIvMV/CNnElrzCWmnB3v6A89X9XJ2CifEUmd8nKoaOtevy\ncCDYwQ0CgYBETm3hskDMRRGVUbfysajfzIdE2CWEyNcxQJHFcxDrsDneCyetBgqA\nzipNeQ6gRRewKkkAyv5IrV+xtS6NxKP9jbohpchJfGKormYJCE+gMM9l11plqteA\nlv7+AfoQK/P1C9H9X/D1l8ab3Dg1fGpz5zYchPWQaH685UEPrf6PiA==\n-----END RSA PRIVATE KEY-----\n"
    }, 
    "certificateId": "99e0367463786c967a8454a44786e1512e8588b55cec7ee44a2a41d30b10628c"
}
SCGroup19:~/environment/body3RetinalImplantSensor $ aws iot attach-policy --policy-name SCGroup19Policy --target arn:aws:iot:eu-west-1:543164014192:cert/99e0367463786c967a8454a44786e1512e8588b55cec7ee44a2a41d30b10628c
SCGroup19:~/environment/body3RetinalImplantSensor $ aws iot attach-thing-principal --thing-name body3RetinalImplantSensor --principal arn:aws:iot:eu-west-1:543164014192:cert/99e0367463786c967a8454a44786e1512e8588b55cec7ee44a2a41d30b10628c
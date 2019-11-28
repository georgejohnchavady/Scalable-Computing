Login to AWS

Create an IAM user name

Create thing from command prompt:

edXIoTUser:~/environment/car2 $ aws iot create-thing --thing-name car2
{
    "thingArn": "arn:aws:iot:eu-west-1:347929320323:thing/car2", 
    "thingName": "car2", 
    "thingId": "fae8d98b-c99b-4b0b-ae7e-e5d7c5b50153"
}

Create certificate and key:

edXIoTUser:~/environment/car2 $ aws iot create-keys-and-certificate --set-as-active --certificate-pem-outfile certificate.pem.crt --private-key-outfile private.pem.key
{
    "certificateArn": "arn:aws:iot:eu-west-1:347929320323:cert/e514c13d49b06f376e8888977de1e553539f7bfbdac3ec802b066726b1c51250", 
    "certificatePem": "-----BEGIN CERTIFICATE-----\nMIIDWjCCAkKgAwIBAgIVAP0U9sNBq03FcYSEsFiCxz7egjx+MA0GCSqGSIb3DQEB\nCwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t\nIEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0xOTExMTgxMTM5\nNDlaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh\ndGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0IKOt0MBXAFARydwL\nBoCKT8+2L0KhnWb+NhGKln4Wbj/DaiY8I+5tgSS6k7MDEtCWj8/g2ZAVwy0JhfbH\nV/K/XeZ6ek2v/iQCWiDPHfM3MlEX+gOwkFCdLDgrkma/DhssuOA3jhEZhJzu8mdu\nrshyzTsCb57jUEZMYgIlmnQvB4YatyPlOTnxY7ADkcXHJy2HHcyRYUm0GTuDmwhB\n8R6UPkAG8aktT00NVDAQbh96pMPKHz+HCosHnxz2RpHMnE0o4K2FPnae3Ady/l6P\nVsjjwIK/Q817uXGHNKSleRAmY7jHaBF9+BA+KYaSvMxzgiSCav6IiyRzVDkOKOTY\nfA+xAgMBAAGjYDBeMB8GA1UdIwQYMBaAFKgrlidY19YClDFD04wSVXjVFmKvMB0G\nA1UdDgQWBBTGqhagiNVr2V+Ghvek4dH9zDwpzTAMBgNVHRMBAf8EAjAAMA4GA1Ud\nDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAndHa2gw3FKHmHd23hVLCp2UM\nUKOU+16uXDxfNvq5uDcKhcsuGaQmUOjxo8KyHjZrjpSbnR0wBPPWdXx8nQbWLYfg\nsFT/rQiLL96ogGDo0SM1SzfnH2w+ACQAp8cZR4uJGkkDO6d4dlGD3HKeH/p0bcaT\nvbctqqzO1BWb9ozNMzcV+k41aj9O6zETKJ9URUAyct1XM/FsRrgJ34xVorGECAkk\nxDPxiBs36bGql+MwPN4tDrOTeP62T9xcImLua64lwZgDxrC1gJTU2/GB7wmHTsYR\nu3eoaNwptk9bslewnfvaAGeDpC29n4B/7j49xqd6qfLkuYW1jeB5GjeZ3J/vIA==\n-----END CERTIFICATE-----\n", 
    "keyPair": {
        "PublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtCCjrdDAVwBQEcncCwaA\nik/Pti9CoZ1m/jYRipZ+Fm4/w2omPCPubYEkupOzAxLQlo/P4NmQFcMtCYX2x1fy\nv13menpNr/4kAlogzx3zNzJRF/oDsJBQnSw4K5Jmvw4bLLjgN44RGYSc7vJnbq7I\ncs07Am+e41BGTGICJZp0LweGGrcj5Tk58WOwA5HFxycthx3MkWFJtBk7g5sIQfEe\nlD5ABvGpLU9NDVQwEG4feqTDyh8/hwqLB58c9kaRzJxNKOCthT52ntwHcv5ej1bI\n48CCv0PNe7lxhzSkpXkQJmO4x2gRffgQPimGkrzMc4Ikgmr+iIskc1Q5Dijk2HwP\nsQIDAQAB\n-----END PUBLIC KEY-----\n", 
        "PrivateKey": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtCCjrdDAVwBQEcncCwaAik/Pti9CoZ1m/jYRipZ+Fm4/w2om\nPCPubYEkupOzAxLQlo/P4NmQFcMtCYX2x1fyv13menpNr/4kAlogzx3zNzJRF/oD\nsJBQnSw4K5Jmvw4bLLjgN44RGYSc7vJnbq7Ics07Am+e41BGTGICJZp0LweGGrcj\n5Tk58WOwA5HFxycthx3MkWFJtBk7g5sIQfEelD5ABvGpLU9NDVQwEG4feqTDyh8/\nhwqLB58c9kaRzJxNKOCthT52ntwHcv5ej1bI48CCv0PNe7lxhzSkpXkQJmO4x2gR\nffgQPimGkrzMc4Ikgmr+iIskc1Q5Dijk2HwPsQIDAQABAoIBAA5UonELsKG7VqNz\nqdv+sm9OljnqXKS6/xyudIrQGkvyjYQgh9Y1DZ0Mrz1gztcpwgqYenNrG7l/g6/E\nRrPpXVi4QcPwwwmDcJ33SbDwsw7rI+SCcZS0hpValUVyKlZ86tCODNiepuGe2VVx\nV6VIpo3rogw5kSyIkG83RPB071VmY6p0oDVQ+QuoCVu/R9yTPGXdnkouNQBow1fY\nmi36fWHhl4lAcISrBr9brqGdQd135O4+hjwzXE3aIDXyfDztCNTFCrs67qnBwuR5\nxBsqL8c5/e/kJbGdBv23dLW2jkgDgHxT34c3tPdkxcNlarg4kSNdQrtY8xagod1h\njpN92pkCgYEA2mPjw+QuR3xRwSPXNgYI8sIEF5s2ZvBjcFcOCpJFfauM1lJQFG7j\n2jAerv7CUUzWLHATbv38Up+kfM/7cIGedfafnzRGkPzAsp8haTGSaME/qvRrogXu\nDG3qf4Dv8OGT+EY7KzmvMRSMb0f0/nrJ0v5cWHVesAF70CoBEMuzWXsCgYEA0yXf\nUo3MrB4DpQpQoEIxhtGSFsadnsgj+6dMxM0x5TxoSN3G6EFWwf38Wpw7l3KOjA1h\nhGWgUBw/dW4jvm/zDQSZQu/FCT613J9kvJAHmCLPJasfYhHLXYBGyRMXtGb+qmsp\nXxgJCNehv2W6DSFPea6OmEwkxipfHLCIQpGGhcMCgYBD/vfqhQAXx9BYl0Upj+V3\nWAsYIn5kvJHpZ2F6zyINx7z4+fXu9rvAslzLVYzA7XB9s4OJelD2lLgNGGCMHf9t\ncRUv54HVIK0KsFshuoqATTL6klF0x+3fNtXdTxLl6AY/Nfa0NaijWmeDOl9AYJC4\nPfQYoqqRmFSpcnqUdSfpQwKBgQCTEBfBWf4qCyWit9J8LF5udlz3/BIgW2mkh1vS\n3tBXx4Ei70Tw00FoEEzJl3NyAloCdfdrzZSg92vDkJjYtQRmFsPgeTuVOtZT+bii\nFPcVIXmB1PQgzCAG2adzuRaTkgDiFY1VLFpujDGeK24wYvkF2Wx76tzaIPzp8JKX\nOuClHQKBgCZoro0UrzkaM2VQqdnQYBKqjuTkJPD1jYNqNY5tCa/9YdXBd4X+hYpi\nAxtqh40QDUCzSvRIA06qNBicx2SWkMSz6PCGvEmAc1hLJeF6crS+gZV18OelfpGS\n2T8T3IFz0vqxQ8hTqVOjeJuKnHqywraA2sgaXE31UUg3NHbTTYjt\n-----END RSA PRIVATE KEY-----\n"
    }, 
    "certificateId": "e514c13d49b06f376e8888977de1e553539f7bfbdac3ec802b066726b1c51250"
}

Attach Policy to certificate:

aws iot attach-policy --policy-name edXPolicy --target certificateArn_changeme
Certificate Arn: arn:aws:iot:eu-west-1:347929320323:cert/e514c13d49b06f376e8888977de1e553539f7bfbdac3ec802b066726b1c51250


Attach thing to certificate:

aws iot attach-thing-principal --thing-name car2 --principal arn:aws:iot:eu-west-1:347929320323:cert/e514c13d49b06f376e8888977de1e553539f7bfbdac3ec802b066726b1c51250

Create a <sensor>.js file to implement a sensor.


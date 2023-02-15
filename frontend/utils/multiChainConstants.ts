export const connext: { [key: number]: string} = {
    5: "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649",        //Goerli
    420: "0x5Ea1bb242326044699C3d81341c5f535d5Af1504",      // optimism goerli
    80001: "0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a",    // mumbai testnet
    421613: "0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2"    // arbitrum goerli
}

export const registries: { [key: number]: string } = {
    5: "0x7081301737A591fa881e6aB13bA02Cf10231305c",
    420: "0x424DcB01B81C11F0663fF5e5CdbB405C0dB6f7C5",
    80001: "0xd3BBd3D02c8ff898d106a2539bb8afD0fCF9dec1",
    421613: "0x424DcB01B81C11F0663fF5e5CdbB405C0dB6f7C5"
}

export const connextDomain: { [key: number]: number} = {
    5: 1735353714,
    420: 1735356532,
    80001: 9991,
    421613: 421613
}

export const registryRoutes: { [key: number]: { [key: number] : string}} = {
    5: {
        0: "0xEc8801FA4A554DAD9cCe27b7294c93A5CD764C26",
        1: "0x284d32bdB98617641dc1834241BdE78a5161ddF6"
    },
    420: {
        0: "0x68B66f64D5a902A0f21E886469B3487bcAa79035",
        1: "0x210f83DaC34A15e6ac2B804045B2891Cfc3b2940"
    },
    80001: {
        0: "0xc9a9969CFd274E357Cc1613fA957b25dCe6aBa85",
        1: "0x286e84CCed9Fd4E8518870E6158A1cb74726b120"
    },
    421613: {
        0: "0x68B66f64D5a902A0f21E886469B3487bcAa79035",
        1: "0x210f83DaC34A15e6ac2B804045B2891Cfc3b2940"
    }
}


export const ConnextWeth: { [key: number]: string} = {
    5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    420: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
    80001: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
    421613: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2"
}

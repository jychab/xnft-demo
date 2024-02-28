export type CnftStaking = {
  version: "0.1.0";
  name: "cnft_staking";
  instructions: [
    {
      name: "stake";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treeAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "merkleTree";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bubblegumProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "logWrapper";
          isMut: false;
          isSigner: false;
        },
        {
          name: "compressionProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "StakeArgs";
          };
        }
      ];
    },
    {
      name: "unstake";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stakeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treeAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "merkleTree";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bubblegumProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "logWrapper";
          isMut: false;
          isSigner: false;
        },
        {
          name: "compressionProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "UnstakeArgs";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "stakeAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isInitialized";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "address";
            type: "publicKey";
          },
          {
            name: "assets";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "StakeArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "root";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "dataHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "creatorHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "nonce";
            type: "u64";
          },
          {
            name: "index";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "UnstakeArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "root";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "dataHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "creatorHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "nonce";
            type: "u64";
          },
          {
            name: "index";
            type: "u32";
          }
        ];
      };
    }
  ];
};

export const IDL: CnftStaking = {
  version: "0.1.0",
  name: "cnft_staking",
  instructions: [
    {
      name: "stake",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treeAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "merkleTree",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bubblegumProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "logWrapper",
          isMut: false,
          isSigner: false,
        },
        {
          name: "compressionProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "StakeArgs",
          },
        },
      ],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treeAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "merkleTree",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bubblegumProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "logWrapper",
          isMut: false,
          isSigner: false,
        },
        {
          name: "compressionProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "UnstakeArgs",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "stakeAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "address",
            type: "publicKey",
          },
          {
            name: "assets",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "StakeArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "root",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "dataHash",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "creatorHash",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "nonce",
            type: "u64",
          },
          {
            name: "index",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "UnstakeArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "root",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "dataHash",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "creatorHash",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "nonce",
            type: "u64",
          },
          {
            name: "index",
            type: "u32",
          },
        ],
      },
    },
  ],
};

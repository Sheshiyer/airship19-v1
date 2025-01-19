# Airship19 Protocol Specification v0.1.0

## Protocol Overview

The Airship19 protocol implements a fractal scale-invariant system for validating and incentivizing compassionate actions through blockchain technology.

## Core Protocol Components

### 1. Proof of Compassion (PoC) Consensus

```solidity
interface ICompassionValidator {
    struct Action {
        address initiator;
        bytes32 actionHash;
        uint256 timestamp;
        uint8 perspectiveType;
        uint256 impactScore;
    }

    struct Validation {
        address validator;
        uint8 perspectiveLevel;
        bool isValid;
        string testimony;
    }

    function validateAction(Action memory action) external returns (bool);
    function submitTestimony(bytes32 actionHash, string memory testimony) external;
    function calculateImpactScore(Action memory action, Validation[] memory validations) external view returns (uint256);
}
```

### 2. Soulbound Evolution Token (SET) Implementation

```solidity
interface ISoulboundToken {
    struct Trait {
        uint8 perspectiveType;
        uint8 level;
        uint256 experience;
        mapping(bytes32 => uint256) achievements;
    }

    function evolve(uint256 tokenId, bytes32 actionHash) external;
    function getPerspectiveLevel(uint256 tokenId, uint8 perspectiveType) external view returns (uint8);
    function isEligibleForEvolution(uint256 tokenId, uint8 perspectiveType) external view returns (bool);
}
```

### 3. Reality Bridge Protocol

```typescript
interface IRealityBridge {
    // Game event to blockchain action mapping
    interface GameEvent {
        eventType: string;
        perspectiveType: number;
        impactMetrics: {
            reach: number;
            depth: number;
            duration: number;
        };
        witnesses: string[];
    }

    // Validation response
    interface ValidationResult {
        isValid: boolean;
        compassionCredits: number;
        evolutionProgress: number;
        achievementUnlocked?: string;
    }
}
```

### 4. Compassion Weighted Voting (CWV)

```solidity
interface IGovernance {
    struct Vote {
        uint256 weight;
        bool support;
        string justification;
    }

    struct Proposal {
        bytes32 proposalHash;
        address proposer;
        uint8 perspectiveCategory;
        uint256 compassionThreshold;
        mapping(address => Vote) votes;
    }

    function calculateVotingPower(address voter) external view returns (uint256);
    function submitVote(bytes32 proposalHash, bool support, string memory justification) external;
    function executeProposal(bytes32 proposalHash) external returns (bool);
}
```

## State Transitions

### Action Validation Flow

1. Action Submission
```typescript
interface ActionSubmission {
    initiator: string;
    actionType: string;
    evidence: string;
    perspective: PerspectiveType;
    witnesses: string[];
}
```

2. Witness Validation
```typescript
interface WitnessValidation {
    witness: string;
    actionHash: string;
    validationScore: number;
    testimony: string;
    timestamp: number;
}
```

3. Impact Calculation
```typescript
interface ImpactMetrics {
    reach: number;      // Number of people affected
    depth: number;      // Intensity of impact
    duration: number;   // Temporal persistence
    rippleEffect: number; // Network effect multiplier
}
```

## Perspective System

### Perspective Types
```typescript
enum PerspectiveType {
    GUARDIAN = 0,  // Community Wellbeing
    WEAVER = 1,    // Connection Building
    SAGE = 2,      // Knowledge Sharing
    CATALYST = 3   // Innovation Driving
}

enum PerspectiveLevel {
    INITIATE = 0,  // Active Learning
    STEWARD = 1,   // Leadership
    ELDER = 2      // Vision Holding
}
```

### Evolution Requirements
```typescript
interface EvolutionCriteria {
    requiredActions: number;
    validationThreshold: number;
    compassionCredits: number;
    timeInLevel: number;
    crossPerspectiveAchievements: Achievement[];
}
```

## Economic Parameters

### Compassion Credits (CC)

```typescript
interface TokenomicParams {
    baseReward: number;
    perspectiveMultiplier: number[];
    validationReward: number;
    evolutionBonus: number;
    maxDailyEmission: number;
}
```

### Fractal Distribution Formula
```typescript
function calculateReward(
    baseAmount: number,
    perspectiveLevel: number,
    impactScore: number,
    networkEffect: number
): number {
    return baseAmount * 
           (1.618 ** perspectiveLevel) * // Golden ratio scaling
           impactScore * 
           (1 + Math.log(networkEffect));
}
```

## Network Parameters

### Validation Thresholds
- Minimum Witnesses: 3
- Cross-Perspective Validation: Required for Steward/Elder levels
- Validation Time Window: 72 hours
- Minimum Validator Stake: 1000 CC
- Elder Validation Weight: 2x
- Steward Validation Weight: 1.5x
- Community Consensus Threshold: 75% for Elder promotions

### Governance Parameters
- Proposal Threshold: 10000 CC
- Voting Period: 7 days
- Execution Delay: 48 hours
- Quorum: 20% of total staked CC

## Security Considerations

### Anti-Gaming Measures
1. Witness Reputation System
2. Action Cooldown Periods
3. Cross-Validation Requirements
4. Impact Score Normalization
5. Sybil Resistance through SET requirements

### Emergency Protocols
1. Validation Circuit Breakers
2. Emergency Governance Procedures
3. Oracle Failure Safeguards

## API Endpoints

### Core Protocol
```typescript
POST /v1/actions/submit
GET /v1/actions/{actionHash}/status
POST /v1/validations/submit
GET /v1/perspectives/{address}/{type}/level
```

### Reality Bridge
```typescript
POST /v1/bridge/game-event
GET /v1/bridge/achievements/{address}
POST /v1/bridge/sync-progress
```

### Governance
```typescript
POST /v1/governance/propose
POST /v1/governance/vote
GET /v1/governance/power/{address}
```

## Version Control

- Protocol Version: 0.1.0
- Smart Contract Addresses: [To be deployed]
- Supported Networks: [To be determined]
- Upgrade Path: [To be defined]

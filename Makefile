.PHONY: generate-types
	
generate-types:
	@echo "Generating types from ABI..."
	@yarn fuels typegen -i $(CONTRACT_PATH)/out/release/*-abi.json --output ./src/services/contracts/multisig/contracts

import sleep from "utils/sleep";

import { Operation } from "../types";

class OperationHandler {
  public async load(
    operations: Operation[],
    handler: (name: string) => void
  ): Promise<void> {
    await Promise.all(
      operations.map(async (operation, index) => {
        try {
          await this.handleOperation(operation, index);
        } catch (error) {
          console.error(
            `Cannot complete operation: "${operation.name}"`,
            error
          );
        }

        handler(operation.name);
      })
    );
  }

  private async handleOperation(operation: Operation, index: number) {
    await sleep(100 * index);

    await operation.method();
  }
}

export default OperationHandler;

import sleep from "utils/sleep";

import { Operation } from "../types";

class OperationHandler {
  public async load(
    operations: Operation[],
    handler: (name: string) => void
  ): Promise<void> {
    await Promise.all(
      operations.map(async (operation, index) => {
        await this.handleOperation(operation, index);

        handler(operation.name);
      })
    );
  }

  private async handleOperation(operation: Operation, index: number) {
    await sleep(100 * index);

    operation.method();
  }
}

export default OperationHandler;

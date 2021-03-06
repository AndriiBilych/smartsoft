import { HttpService, Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModuleRef } from "@nestjs/core";

import {
  ITransCreate,
  Trans,
  TransConfig,
  CreatorService,
  RefresherService,
  ITransPaymentSingleService,
  ITransInternalService, RefundService,
} from "@smartsoft001/trans-domain";
import { PayuService } from "@smartsoft001/payu";
import { PaypalService } from "@smartsoft001/paypal";
import { RevolutService } from "@smartsoft001/revolut";

import { TRANS_TOKEN_INTERNAL_SERVICE } from "../internal/internal.service";

@Injectable()
export class TransService {
  private _paymentService: {
    [key: string]: ITransPaymentSingleService;
  } = {
    payu: this.payuService,
    paypal: this.paypalService,
    revolut: this.revolutService,
  };

  private _internalService = {
    create: (trans: Trans<any>) => {
      return this.httpService
        .post(this.config.internalApiUrl, trans)
        .toPromise()
        .then((res) => res.data);
    },

    refresh: (trans: Trans<any>) => {
      return this.httpService
        .put(this.config.internalApiUrl + "/" + trans.id, trans)
        .toPromise()
        .then((res) => res.data);
    },
  };

  constructor(
    private moduleRef: ModuleRef,
    private creatorService: CreatorService<any>,
    private refresherService: RefresherService<any>,
    private refundService: RefundService<any>,
    private httpService: HttpService,
    private config: TransConfig,
    @InjectRepository(Trans) private repository: Repository<Trans<any>>,
    @Optional() private payuService: PayuService,
    @Optional() private paypalService: PaypalService,
    @Optional() private revolutService: RevolutService
  ) {}

  create<T>(ops: ITransCreate<T>): Promise<{ orderId: string, redirectUrl?: string, responseData?: any }> {
    return this.creatorService.create(
      ops,
      this.getInternalService(),
      this._paymentService
    );
  }

  async refresh(transId: string, data = {}): Promise<void> {
    await this.refresherService.refresh(
      transId,
      this.getInternalService(),
      this._paymentService,
      data
    );
  }

  async refund(transId: string, comment = "Refund"): Promise<void> {
    await this.refundService.refund(
        transId,
        this.getInternalService(),
        this._paymentService,
        comment
    );
  }

  async getById(id: any): Promise<Trans<any>> {
    return await this.repository.findOne({
      _id: id,
    } as any);
  }

  private getInternalService(): ITransInternalService<any> {
    try {
      return this.moduleRef.get(TRANS_TOKEN_INTERNAL_SERVICE, {
        strict: false,
      });
    } catch (e) {
      return this._internalService;
    }
  }
}

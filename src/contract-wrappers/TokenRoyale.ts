import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type StdAddress = {
  $$type: 'StdAddress';
  workchain: bigint;
  address: bigint;
};

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 8);
    b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(8);
  let _address = sc_0.loadUintBig(256);
  return {
    $$type: 'StdAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: 'StdAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: 'StdAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleStdAddress(source: StdAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse());
    },
  };
}

export type VarAddress = {
  $$type: 'VarAddress';
  workchain: bigint;
  address: Slice;
};

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 32);
    b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(32);
  let _address = sc_0.loadRef().asSlice();
  return {
    $$type: 'VarAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: 'VarAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: 'VarAddress' as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleVarAddress(source: VarAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadGetterTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadGetterTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type Join = {
  $$type: 'Join';
};

export function storeJoin(src: Join) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(827933329, 32);
  };
}

export function loadJoin(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 827933329) {
    throw Error('Invalid prefix');
  }
  return { $$type: 'Join' as const };
}

function loadTupleJoin(source: TupleReader) {
  return { $$type: 'Join' as const };
}

function loadGetterTupleJoin(source: TupleReader) {
  return { $$type: 'Join' as const };
}

function storeTupleJoin(source: Join) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserJoin(): DictionaryValue<Join> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJoin(src)).endCell());
    },
    parse: (src) => {
      return loadJoin(src.loadRef().beginParse());
    },
  };
}

export type CheckIn = {
  $$type: 'CheckIn';
};

export function storeCheckIn(src: CheckIn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(928085272, 32);
  };
}

export function loadCheckIn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 928085272) {
    throw Error('Invalid prefix');
  }
  return { $$type: 'CheckIn' as const };
}

function loadTupleCheckIn(source: TupleReader) {
  return { $$type: 'CheckIn' as const };
}

function loadGetterTupleCheckIn(source: TupleReader) {
  return { $$type: 'CheckIn' as const };
}

function storeTupleCheckIn(source: CheckIn) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserCheckIn(): DictionaryValue<CheckIn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCheckIn(src)).endCell());
    },
    parse: (src) => {
      return loadCheckIn(src.loadRef().beginParse());
    },
  };
}

export type SetEliminationTimestamps = {
  $$type: 'SetEliminationTimestamps';
  startTimestamp: bigint;
  roundDurations: Dictionary<number, number>;
};

export function storeSetEliminationTimestamps(src: SetEliminationTimestamps) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(996966737, 32);
    b_0.storeUint(src.startTimestamp, 32);
    b_0.storeDict(
      src.roundDurations,
      Dictionary.Keys.Uint(8),
      Dictionary.Values.Uint(16)
    );
  };
}

export function loadSetEliminationTimestamps(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 996966737) {
    throw Error('Invalid prefix');
  }
  let _startTimestamp = sc_0.loadUintBig(32);
  let _roundDurations = Dictionary.load(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(16),
    sc_0
  );
  return {
    $$type: 'SetEliminationTimestamps' as const,
    startTimestamp: _startTimestamp,
    roundDurations: _roundDurations,
  };
}

function loadTupleSetEliminationTimestamps(source: TupleReader) {
  let _startTimestamp = source.readBigNumber();
  let _roundDurations = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(16),
    source.readCellOpt()
  );
  return {
    $$type: 'SetEliminationTimestamps' as const,
    startTimestamp: _startTimestamp,
    roundDurations: _roundDurations,
  };
}

function loadGetterTupleSetEliminationTimestamps(source: TupleReader) {
  let _startTimestamp = source.readBigNumber();
  let _roundDurations = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(16),
    source.readCellOpt()
  );
  return {
    $$type: 'SetEliminationTimestamps' as const,
    startTimestamp: _startTimestamp,
    roundDurations: _roundDurations,
  };
}

function storeTupleSetEliminationTimestamps(source: SetEliminationTimestamps) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.startTimestamp);
  builder.writeCell(
    source.roundDurations.size > 0
      ? beginCell()
          .storeDictDirect(
            source.roundDurations,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(16)
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserSetEliminationTimestamps(): DictionaryValue<SetEliminationTimestamps> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeSetEliminationTimestamps(src)).endCell()
      );
    },
    parse: (src) => {
      return loadSetEliminationTimestamps(src.loadRef().beginParse());
    },
  };
}

export type CompleteTheGame = {
  $$type: 'CompleteTheGame';
};

export function storeCompleteTheGame(src: CompleteTheGame) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2550845504, 32);
  };
}

export function loadCompleteTheGame(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2550845504) {
    throw Error('Invalid prefix');
  }
  return { $$type: 'CompleteTheGame' as const };
}

function loadTupleCompleteTheGame(source: TupleReader) {
  return { $$type: 'CompleteTheGame' as const };
}

function loadGetterTupleCompleteTheGame(source: TupleReader) {
  return { $$type: 'CompleteTheGame' as const };
}

function storeTupleCompleteTheGame(source: CompleteTheGame) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserCompleteTheGame(): DictionaryValue<CompleteTheGame> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCompleteTheGame(src)).endCell());
    },
    parse: (src) => {
      return loadCompleteTheGame(src.loadRef().beginParse());
    },
  };
}

export type PayRent = {
  $$type: 'PayRent';
};

export function storePayRent(src: PayRent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3044184736, 32);
  };
}

export function loadPayRent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3044184736) {
    throw Error('Invalid prefix');
  }
  return { $$type: 'PayRent' as const };
}

function loadTuplePayRent(source: TupleReader) {
  return { $$type: 'PayRent' as const };
}

function loadGetterTuplePayRent(source: TupleReader) {
  return { $$type: 'PayRent' as const };
}

function storeTuplePayRent(source: PayRent) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserPayRent(): DictionaryValue<PayRent> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePayRent(src)).endCell());
    },
    parse: (src) => {
      return loadPayRent(src.loadRef().beginParse());
    },
  };
}

export type SetEntryFee = {
  $$type: 'SetEntryFee';
  entryFee: bigint;
};

export function storeSetEntryFee(src: SetEntryFee) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(118508317, 32);
    b_0.storeUint(src.entryFee, 128);
  };
}

export function loadSetEntryFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 118508317) {
    throw Error('Invalid prefix');
  }
  let _entryFee = sc_0.loadUintBig(128);
  return { $$type: 'SetEntryFee' as const, entryFee: _entryFee };
}

function loadTupleSetEntryFee(source: TupleReader) {
  let _entryFee = source.readBigNumber();
  return { $$type: 'SetEntryFee' as const, entryFee: _entryFee };
}

function loadGetterTupleSetEntryFee(source: TupleReader) {
  let _entryFee = source.readBigNumber();
  return { $$type: 'SetEntryFee' as const, entryFee: _entryFee };
}

function storeTupleSetEntryFee(source: SetEntryFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.entryFee);
  return builder.build();
}

function dictValueParserSetEntryFee(): DictionaryValue<SetEntryFee> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetEntryFee(src)).endCell());
    },
    parse: (src) => {
      return loadSetEntryFee(src.loadRef().beginParse());
    },
  };
}

export type SetCommission = {
  $$type: 'SetCommission';
  commission: bigint;
};

export function storeSetCommission(src: SetCommission) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4061126341, 32);
    b_0.storeUint(src.commission, 8);
  };
}

export function loadSetCommission(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4061126341) {
    throw Error('Invalid prefix');
  }
  let _commission = sc_0.loadUintBig(8);
  return { $$type: 'SetCommission' as const, commission: _commission };
}

function loadTupleSetCommission(source: TupleReader) {
  let _commission = source.readBigNumber();
  return { $$type: 'SetCommission' as const, commission: _commission };
}

function loadGetterTupleSetCommission(source: TupleReader) {
  let _commission = source.readBigNumber();
  return { $$type: 'SetCommission' as const, commission: _commission };
}

function storeTupleSetCommission(source: SetCommission) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.commission);
  return builder.build();
}

function dictValueParserSetCommission(): DictionaryValue<SetCommission> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetCommission(src)).endCell());
    },
    parse: (src) => {
      return loadSetCommission(src.loadRef().beginParse());
    },
  };
}

export type SetTonForStorage = {
  $$type: 'SetTonForStorage';
  tonForStorage: bigint;
};

export function storeSetTonForStorage(src: SetTonForStorage) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3991921999, 32);
    b_0.storeUint(src.tonForStorage, 128);
  };
}

export function loadSetTonForStorage(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3991921999) {
    throw Error('Invalid prefix');
  }
  let _tonForStorage = sc_0.loadUintBig(128);
  return { $$type: 'SetTonForStorage' as const, tonForStorage: _tonForStorage };
}

function loadTupleSetTonForStorage(source: TupleReader) {
  let _tonForStorage = source.readBigNumber();
  return { $$type: 'SetTonForStorage' as const, tonForStorage: _tonForStorage };
}

function loadGetterTupleSetTonForStorage(source: TupleReader) {
  let _tonForStorage = source.readBigNumber();
  return { $$type: 'SetTonForStorage' as const, tonForStorage: _tonForStorage };
}

function storeTupleSetTonForStorage(source: SetTonForStorage) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.tonForStorage);
  return builder.build();
}

function dictValueParserSetTonForStorage(): DictionaryValue<SetTonForStorage> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetTonForStorage(src)).endCell());
    },
    parse: (src) => {
      return loadSetTonForStorage(src.loadRef().beginParse());
    },
  };
}

export type Participant = {
  $$type: 'Participant';
  address: Address;
  lastCheckInTime: bigint;
};

export function storeParticipant(src: Participant) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.address);
    b_0.storeUint(src.lastCheckInTime, 32);
  };
}

export function loadParticipant(slice: Slice) {
  let sc_0 = slice;
  let _address = sc_0.loadAddress();
  let _lastCheckInTime = sc_0.loadUintBig(32);
  return {
    $$type: 'Participant' as const,
    address: _address,
    lastCheckInTime: _lastCheckInTime,
  };
}

function loadTupleParticipant(source: TupleReader) {
  let _address = source.readAddress();
  let _lastCheckInTime = source.readBigNumber();
  return {
    $$type: 'Participant' as const,
    address: _address,
    lastCheckInTime: _lastCheckInTime,
  };
}

function loadGetterTupleParticipant(source: TupleReader) {
  let _address = source.readAddress();
  let _lastCheckInTime = source.readBigNumber();
  return {
    $$type: 'Participant' as const,
    address: _address,
    lastCheckInTime: _lastCheckInTime,
  };
}

function storeTupleParticipant(source: Participant) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeNumber(source.lastCheckInTime);
  return builder.build();
}

function dictValueParserParticipant(): DictionaryValue<Participant> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeParticipant(src)).endCell());
    },
    parse: (src) => {
      return loadParticipant(src.loadRef().beginParse());
    },
  };
}

export type IterableParticipantMap = {
  $$type: 'IterableParticipantMap';
  m: Dictionary<number, Participant>;
  index: Dictionary<Address, number>;
  length: bigint;
};

export function storeIterableParticipantMap(src: IterableParticipantMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.m,
      Dictionary.Keys.Uint(16),
      dictValueParserParticipant()
    );
    b_0.storeDict(
      src.index,
      Dictionary.Keys.Address(),
      Dictionary.Values.Uint(16)
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadIterableParticipantMap(slice: Slice) {
  let sc_0 = slice;
  let _m = Dictionary.load(
    Dictionary.Keys.Uint(16),
    dictValueParserParticipant(),
    sc_0
  );
  let _index = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.Uint(16),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return {
    $$type: 'IterableParticipantMap' as const,
    m: _m,
    index: _index,
    length: _length,
  };
}

function loadTupleIterableParticipantMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    dictValueParserParticipant(),
    source.readCellOpt()
  );
  let _index = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.Uint(16),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return {
    $$type: 'IterableParticipantMap' as const,
    m: _m,
    index: _index,
    length: _length,
  };
}

function loadGetterTupleIterableParticipantMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    dictValueParserParticipant(),
    source.readCellOpt()
  );
  let _index = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.Uint(16),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return {
    $$type: 'IterableParticipantMap' as const,
    m: _m,
    index: _index,
    length: _length,
  };
}

function storeTupleIterableParticipantMap(source: IterableParticipantMap) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.m.size > 0
      ? beginCell()
          .storeDictDirect(
            source.m,
            Dictionary.Keys.Uint(16),
            dictValueParserParticipant()
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.index.size > 0
      ? beginCell()
          .storeDictDirect(
            source.index,
            Dictionary.Keys.Address(),
            Dictionary.Values.Uint(16)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserIterableParticipantMap(): DictionaryValue<IterableParticipantMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeIterableParticipantMap(src)).endCell()
      );
    },
    parse: (src) => {
      return loadIterableParticipantMap(src.loadRef().beginParse());
    },
  };
}

export type EliminationTimestampsMap = {
  $$type: 'EliminationTimestampsMap';
  m: Dictionary<number, number>;
  length: bigint;
};

export function storeEliminationTimestampsMap(src: EliminationTimestampsMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.m, Dictionary.Keys.Uint(8), Dictionary.Values.Uint(32));
    b_0.storeInt(src.length, 257);
  };
}

export function loadEliminationTimestampsMap(slice: Slice) {
  let sc_0 = slice;
  let _m = Dictionary.load(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return {
    $$type: 'EliminationTimestampsMap' as const,
    m: _m,
    length: _length,
  };
}

function loadTupleEliminationTimestampsMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return {
    $$type: 'EliminationTimestampsMap' as const,
    m: _m,
    length: _length,
  };
}

function loadGetterTupleEliminationTimestampsMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return {
    $$type: 'EliminationTimestampsMap' as const,
    m: _m,
    length: _length,
  };
}

function storeTupleEliminationTimestampsMap(source: EliminationTimestampsMap) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.m.size > 0
      ? beginCell()
          .storeDictDirect(
            source.m,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(32)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserEliminationTimestampsMap(): DictionaryValue<EliminationTimestampsMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeEliminationTimestampsMap(src)).endCell()
      );
    },
    parse: (src) => {
      return loadEliminationTimestampsMap(src.loadRef().beginParse());
    },
  };
}

export type WinnersMap = {
  $$type: 'WinnersMap';
  m: Dictionary<number, Address>;
  length: bigint;
};

export function storeWinnersMap(src: WinnersMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.m, Dictionary.Keys.Uint(16), Dictionary.Values.Address());
    b_0.storeInt(src.length, 257);
  };
}

export function loadWinnersMap(slice: Slice) {
  let sc_0 = slice;
  let _m = Dictionary.load(
    Dictionary.Keys.Uint(16),
    Dictionary.Values.Address(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: 'WinnersMap' as const, m: _m, length: _length };
}

function loadTupleWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    Dictionary.Values.Address(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'WinnersMap' as const, m: _m, length: _length };
}

function loadGetterTupleWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Uint(16),
    Dictionary.Values.Address(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'WinnersMap' as const, m: _m, length: _length };
}

function storeTupleWinnersMap(source: WinnersMap) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.m.size > 0
      ? beginCell()
          .storeDictDirect(
            source.m,
            Dictionary.Keys.Uint(16),
            Dictionary.Values.Address()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserWinnersMap(): DictionaryValue<WinnersMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWinnersMap(src)).endCell());
    },
    parse: (src) => {
      return loadWinnersMap(src.loadRef().beginParse());
    },
  };
}

export type LastGameWinnersMap = {
  $$type: 'LastGameWinnersMap';
  m: Dictionary<Address, bigint>;
  length: bigint;
};

export function storeLastGameWinnersMap(src: LastGameWinnersMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.m,
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257)
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadLastGameWinnersMap(slice: Slice) {
  let sc_0 = slice;
  let _m = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: 'LastGameWinnersMap' as const, m: _m, length: _length };
}

function loadTupleLastGameWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'LastGameWinnersMap' as const, m: _m, length: _length };
}

function loadGetterTupleLastGameWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'LastGameWinnersMap' as const, m: _m, length: _length };
}

function storeTupleLastGameWinnersMap(source: LastGameWinnersMap) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.m.size > 0
      ? beginCell()
          .storeDictDirect(
            source.m,
            Dictionary.Keys.Address(),
            Dictionary.Values.BigInt(257)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserLastGameWinnersMap(): DictionaryValue<LastGameWinnersMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeLastGameWinnersMap(src)).endCell()
      );
    },
    parse: (src) => {
      return loadLastGameWinnersMap(src.loadRef().beginParse());
    },
  };
}

export type ParticipantsWinnings = {
  $$type: 'ParticipantsWinnings';
  count: bigint;
  totalAmount: bigint;
};

export function storeParticipantsWinnings(src: ParticipantsWinnings) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.count, 257);
    b_0.storeInt(src.totalAmount, 257);
  };
}

export function loadParticipantsWinnings(slice: Slice) {
  let sc_0 = slice;
  let _count = sc_0.loadIntBig(257);
  let _totalAmount = sc_0.loadIntBig(257);
  return {
    $$type: 'ParticipantsWinnings' as const,
    count: _count,
    totalAmount: _totalAmount,
  };
}

function loadTupleParticipantsWinnings(source: TupleReader) {
  let _count = source.readBigNumber();
  let _totalAmount = source.readBigNumber();
  return {
    $$type: 'ParticipantsWinnings' as const,
    count: _count,
    totalAmount: _totalAmount,
  };
}

function loadGetterTupleParticipantsWinnings(source: TupleReader) {
  let _count = source.readBigNumber();
  let _totalAmount = source.readBigNumber();
  return {
    $$type: 'ParticipantsWinnings' as const,
    count: _count,
    totalAmount: _totalAmount,
  };
}

function storeTupleParticipantsWinnings(source: ParticipantsWinnings) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.count);
  builder.writeNumber(source.totalAmount);
  return builder.build();
}

function dictValueParserParticipantsWinnings(): DictionaryValue<ParticipantsWinnings> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeParticipantsWinnings(src)).endCell()
      );
    },
    parse: (src) => {
      return loadParticipantsWinnings(src.loadRef().beginParse());
    },
  };
}

export type AllTimeWinnersMap = {
  $$type: 'AllTimeWinnersMap';
  m: Dictionary<Address, ParticipantsWinnings>;
  length: bigint;
};

export function storeAllTimeWinnersMap(src: AllTimeWinnersMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.m,
      Dictionary.Keys.Address(),
      dictValueParserParticipantsWinnings()
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadAllTimeWinnersMap(slice: Slice) {
  let sc_0 = slice;
  let _m = Dictionary.load(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return { $$type: 'AllTimeWinnersMap' as const, m: _m, length: _length };
}

function loadTupleAllTimeWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'AllTimeWinnersMap' as const, m: _m, length: _length };
}

function loadGetterTupleAllTimeWinnersMap(source: TupleReader) {
  let _m = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return { $$type: 'AllTimeWinnersMap' as const, m: _m, length: _length };
}

function storeTupleAllTimeWinnersMap(source: AllTimeWinnersMap) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.m.size > 0
      ? beginCell()
          .storeDictDirect(
            source.m,
            Dictionary.Keys.Address(),
            dictValueParserParticipantsWinnings()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserAllTimeWinnersMap(): DictionaryValue<AllTimeWinnersMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeAllTimeWinnersMap(src)).endCell()
      );
    },
    parse: (src) => {
      return loadAllTimeWinnersMap(src.loadRef().beginParse());
    },
  };
}

export type GameState = {
  $$type: 'GameState';
  comission: bigint;
  entryFee: bigint;
  eliminationTimestamps: Dictionary<number, number>;
  upcomingEliminationTimestamp: bigint | null;
  currentRound: bigint | null;
  amountOfParticipants: bigint;
  amountOfRemainingParticipants: bigint | null;
  lastGameWinners: Dictionary<Address, bigint>;
  allTimeWinners: Dictionary<Address, ParticipantsWinnings>;
  hasCheckedInThisRound: boolean | null;
  isStillInGame: boolean | null;
};

export function storeGameState(src: GameState) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.comission, 8);
    b_0.storeUint(src.entryFee, 128);
    b_0.storeDict(
      src.eliminationTimestamps,
      Dictionary.Keys.Uint(8),
      Dictionary.Values.Uint(32)
    );
    if (
      src.upcomingEliminationTimestamp !== null &&
      src.upcomingEliminationTimestamp !== undefined
    ) {
      b_0.storeBit(true).storeUint(src.upcomingEliminationTimestamp, 32);
    } else {
      b_0.storeBit(false);
    }
    if (src.currentRound !== null && src.currentRound !== undefined) {
      b_0.storeBit(true).storeUint(src.currentRound, 8);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeUint(src.amountOfParticipants, 16);
    if (
      src.amountOfRemainingParticipants !== null &&
      src.amountOfRemainingParticipants !== undefined
    ) {
      b_0.storeBit(true).storeUint(src.amountOfRemainingParticipants, 16);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeDict(
      src.lastGameWinners,
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257)
    );
    b_0.storeDict(
      src.allTimeWinners,
      Dictionary.Keys.Address(),
      dictValueParserParticipantsWinnings()
    );
    if (
      src.hasCheckedInThisRound !== null &&
      src.hasCheckedInThisRound !== undefined
    ) {
      b_0.storeBit(true).storeBit(src.hasCheckedInThisRound);
    } else {
      b_0.storeBit(false);
    }
    if (src.isStillInGame !== null && src.isStillInGame !== undefined) {
      b_0.storeBit(true).storeBit(src.isStillInGame);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadGameState(slice: Slice) {
  let sc_0 = slice;
  let _comission = sc_0.loadUintBig(8);
  let _entryFee = sc_0.loadUintBig(128);
  let _eliminationTimestamps = Dictionary.load(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    sc_0
  );
  let _upcomingEliminationTimestamp = sc_0.loadBit()
    ? sc_0.loadUintBig(32)
    : null;
  let _currentRound = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
  let _amountOfParticipants = sc_0.loadUintBig(16);
  let _amountOfRemainingParticipants = sc_0.loadBit()
    ? sc_0.loadUintBig(16)
    : null;
  let _lastGameWinners = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    sc_0
  );
  let _allTimeWinners = Dictionary.load(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    sc_0
  );
  let _hasCheckedInThisRound = sc_0.loadBit() ? sc_0.loadBit() : null;
  let _isStillInGame = sc_0.loadBit() ? sc_0.loadBit() : null;
  return {
    $$type: 'GameState' as const,
    comission: _comission,
    entryFee: _entryFee,
    eliminationTimestamps: _eliminationTimestamps,
    upcomingEliminationTimestamp: _upcomingEliminationTimestamp,
    currentRound: _currentRound,
    amountOfParticipants: _amountOfParticipants,
    amountOfRemainingParticipants: _amountOfRemainingParticipants,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
    hasCheckedInThisRound: _hasCheckedInThisRound,
    isStillInGame: _isStillInGame,
  };
}

function loadTupleGameState(source: TupleReader) {
  let _comission = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _eliminationTimestamps = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _upcomingEliminationTimestamp = source.readBigNumberOpt();
  let _currentRound = source.readBigNumberOpt();
  let _amountOfParticipants = source.readBigNumber();
  let _amountOfRemainingParticipants = source.readBigNumberOpt();
  let _lastGameWinners = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _allTimeWinners = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    source.readCellOpt()
  );
  let _hasCheckedInThisRound = source.readBooleanOpt();
  let _isStillInGame = source.readBooleanOpt();
  return {
    $$type: 'GameState' as const,
    comission: _comission,
    entryFee: _entryFee,
    eliminationTimestamps: _eliminationTimestamps,
    upcomingEliminationTimestamp: _upcomingEliminationTimestamp,
    currentRound: _currentRound,
    amountOfParticipants: _amountOfParticipants,
    amountOfRemainingParticipants: _amountOfRemainingParticipants,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
    hasCheckedInThisRound: _hasCheckedInThisRound,
    isStillInGame: _isStillInGame,
  };
}

function loadGetterTupleGameState(source: TupleReader) {
  let _comission = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _eliminationTimestamps = Dictionary.loadDirect(
    Dictionary.Keys.Uint(8),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _upcomingEliminationTimestamp = source.readBigNumberOpt();
  let _currentRound = source.readBigNumberOpt();
  let _amountOfParticipants = source.readBigNumber();
  let _amountOfRemainingParticipants = source.readBigNumberOpt();
  let _lastGameWinners = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _allTimeWinners = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserParticipantsWinnings(),
    source.readCellOpt()
  );
  let _hasCheckedInThisRound = source.readBooleanOpt();
  let _isStillInGame = source.readBooleanOpt();
  return {
    $$type: 'GameState' as const,
    comission: _comission,
    entryFee: _entryFee,
    eliminationTimestamps: _eliminationTimestamps,
    upcomingEliminationTimestamp: _upcomingEliminationTimestamp,
    currentRound: _currentRound,
    amountOfParticipants: _amountOfParticipants,
    amountOfRemainingParticipants: _amountOfRemainingParticipants,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
    hasCheckedInThisRound: _hasCheckedInThisRound,
    isStillInGame: _isStillInGame,
  };
}

function storeTupleGameState(source: GameState) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.comission);
  builder.writeNumber(source.entryFee);
  builder.writeCell(
    source.eliminationTimestamps.size > 0
      ? beginCell()
          .storeDictDirect(
            source.eliminationTimestamps,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(32)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.upcomingEliminationTimestamp);
  builder.writeNumber(source.currentRound);
  builder.writeNumber(source.amountOfParticipants);
  builder.writeNumber(source.amountOfRemainingParticipants);
  builder.writeCell(
    source.lastGameWinners.size > 0
      ? beginCell()
          .storeDictDirect(
            source.lastGameWinners,
            Dictionary.Keys.Address(),
            Dictionary.Values.BigInt(257)
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.allTimeWinners.size > 0
      ? beginCell()
          .storeDictDirect(
            source.allTimeWinners,
            Dictionary.Keys.Address(),
            dictValueParserParticipantsWinnings()
          )
          .endCell()
      : null
  );
  builder.writeBoolean(source.hasCheckedInThisRound);
  builder.writeBoolean(source.isStillInGame);
  return builder.build();
}

function dictValueParserGameState(): DictionaryValue<GameState> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGameState(src)).endCell());
    },
    parse: (src) => {
      return loadGameState(src.loadRef().beginParse());
    },
  };
}

export type TokenRoyale$Data = {
  $$type: 'TokenRoyale$Data';
  owner: Address;
  id: bigint;
  participants: IterableParticipantMap;
  eliminationTimestamps: EliminationTimestampsMap;
  entryFee: bigint;
  comission: bigint;
  tonForStorage: bigint;
  lastGameWinners: LastGameWinnersMap;
  allTimeWinners: AllTimeWinnersMap;
};

export function storeTokenRoyale$Data(src: TokenRoyale$Data) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeUint(src.id, 32);
    b_0.store(storeIterableParticipantMap(src.participants));
    let b_1 = new Builder();
    b_1.store(storeEliminationTimestampsMap(src.eliminationTimestamps));
    b_1.storeUint(src.entryFee, 128);
    b_1.storeUint(src.comission, 8);
    b_1.storeInt(src.tonForStorage, 257);
    b_1.store(storeLastGameWinnersMap(src.lastGameWinners));
    let b_2 = new Builder();
    b_2.store(storeAllTimeWinnersMap(src.allTimeWinners));
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadTokenRoyale$Data(slice: Slice) {
  let sc_0 = slice;
  let _owner = sc_0.loadAddress();
  let _id = sc_0.loadUintBig(32);
  let _participants = loadIterableParticipantMap(sc_0);
  let sc_1 = sc_0.loadRef().beginParse();
  let _eliminationTimestamps = loadEliminationTimestampsMap(sc_1);
  let _entryFee = sc_1.loadUintBig(128);
  let _comission = sc_1.loadUintBig(8);
  let _tonForStorage = sc_1.loadIntBig(257);
  let _lastGameWinners = loadLastGameWinnersMap(sc_1);
  let sc_2 = sc_1.loadRef().beginParse();
  let _allTimeWinners = loadAllTimeWinnersMap(sc_2);
  return {
    $$type: 'TokenRoyale$Data' as const,
    owner: _owner,
    id: _id,
    participants: _participants,
    eliminationTimestamps: _eliminationTimestamps,
    entryFee: _entryFee,
    comission: _comission,
    tonForStorage: _tonForStorage,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
  };
}

function loadTupleTokenRoyale$Data(source: TupleReader) {
  let _owner = source.readAddress();
  let _id = source.readBigNumber();
  const _participants = loadTupleIterableParticipantMap(source);
  const _eliminationTimestamps = loadTupleEliminationTimestampsMap(source);
  let _entryFee = source.readBigNumber();
  let _comission = source.readBigNumber();
  let _tonForStorage = source.readBigNumber();
  const _lastGameWinners = loadTupleLastGameWinnersMap(source);
  const _allTimeWinners = loadTupleAllTimeWinnersMap(source);
  return {
    $$type: 'TokenRoyale$Data' as const,
    owner: _owner,
    id: _id,
    participants: _participants,
    eliminationTimestamps: _eliminationTimestamps,
    entryFee: _entryFee,
    comission: _comission,
    tonForStorage: _tonForStorage,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
  };
}

function loadGetterTupleTokenRoyale$Data(source: TupleReader) {
  let _owner = source.readAddress();
  let _id = source.readBigNumber();
  const _participants = loadGetterTupleIterableParticipantMap(source);
  const _eliminationTimestamps =
    loadGetterTupleEliminationTimestampsMap(source);
  let _entryFee = source.readBigNumber();
  let _comission = source.readBigNumber();
  let _tonForStorage = source.readBigNumber();
  const _lastGameWinners = loadGetterTupleLastGameWinnersMap(source);
  const _allTimeWinners = loadGetterTupleAllTimeWinnersMap(source);
  return {
    $$type: 'TokenRoyale$Data' as const,
    owner: _owner,
    id: _id,
    participants: _participants,
    eliminationTimestamps: _eliminationTimestamps,
    entryFee: _entryFee,
    comission: _comission,
    tonForStorage: _tonForStorage,
    lastGameWinners: _lastGameWinners,
    allTimeWinners: _allTimeWinners,
  };
}

function storeTupleTokenRoyale$Data(source: TokenRoyale$Data) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeNumber(source.id);
  builder.writeTuple(storeTupleIterableParticipantMap(source.participants));
  builder.writeTuple(
    storeTupleEliminationTimestampsMap(source.eliminationTimestamps)
  );
  builder.writeNumber(source.entryFee);
  builder.writeNumber(source.comission);
  builder.writeNumber(source.tonForStorage);
  builder.writeTuple(storeTupleLastGameWinnersMap(source.lastGameWinners));
  builder.writeTuple(storeTupleAllTimeWinnersMap(source.allTimeWinners));
  return builder.build();
}

function dictValueParserTokenRoyale$Data(): DictionaryValue<TokenRoyale$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTokenRoyale$Data(src)).endCell());
    },
    parse: (src) => {
      return loadTokenRoyale$Data(src.loadRef().beginParse());
    },
  };
}

type TokenRoyale_init_args = {
  $$type: 'TokenRoyale_init_args';
  id: bigint;
};

function initTokenRoyale_init_args(src: TokenRoyale_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.id, 257);
  };
}

async function TokenRoyale_init(id: bigint) {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    'te6cckECdwEAEj0AAQHAAQEFoBvfAgEU/wD0pBP0vPLICwMCAWIEMwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VR3bPPLggmgFMgSSAZIwf+BwIddJwh+VMCDXCx/eIIIQMVlCkbrjAiCCEDdRdRi6jpAw0x8BghA3UXUYuvLggW0x4CCCELVykqC64wIgghA7bIFRugYKEBID+jDTHwGCEDFZQpG68uCBbTEw+EL4QW8kE18DgS0gURm+8vSBWO8pwgCOFip4cIAgQTP0Dm+hlAHXATCSW23ibrORcOLy9IIAijL4Iyt4cIAgQTP0Dm+hlAHXATCSW23iIG7y0IC58vQQPEug2zz4QnByiH9VMG1t2zwwS6l/BwkwAdyCAKNZIqSCAP3ou/L0gUJ0I4EBCyOAEEEz9ApvoZQB1wEwkltt4m7y9PgjIYAQAshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfySMQNgEgbpUwWfRbMJRBM/QX4hKBAQtUEEOAEAgAKCFulVtZ9FkwmMgBzwFBM/RB4gGkAFQAAAAAWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGpvaW5lZCB0aGUgZ2FtZSEB7DD4QoIAwXAsgQELI4AQQTP0Cm+hlAHXATCSW23ibrPy9HAqeCKAIEEz9A5voZQB1wEwkltt4iBu8tCAnfgjIb6VKqVSILmRcOKOGzCkKngigCBBM/QOb6GUAdcBMJJbbeIgbvLQgOghwACYXwOCAOwS8vDjDn8LBOJUftwl2zx4I6UuWYAgQTP0Dm+hlAHXATCSW23iIG7y0IAjwAHjAngkpv4vWYAgQTP0Dm+hlAHXATCSW23iIG7y0IAtpRW6lfgjUAO+kjJw4phfBIIAyoby8OAggWWFA7kS8vSCAJ+KAr7y9BA8S6DbPHUMDQ4DNjMxgWWFArny9BA8S6DbPIgQPEug+EIBf23bPA0PLwDI+CNSEIEBC1RFFIAQQTP0Cm+hlAHXATCSW23iggDBcCFus/L0gBABIG7y0IBQI8hZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfyRA1EiBulTBZ9FswlEEz9BfiAgIYiBA8S6D4QgF/bds8Dy8ASgAAAABZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgY2hlY2tlZCBpbiECPjDTHwGCELVykqC68uCBbTEw+EJwcoh/VTBtbds8MH8RMAAiAAAAAFJlbnQgaXMgcGFpZCEElo6YMNMfAYIQO2yBUbry4IHTH/QEWWwS2zx/4CCCEJgK0EC6jpMw0x8BghCYCtBAuvLggW0x2zx/4CCCEAcQSx264wIgghDyD97FuhMWJigE2FXR2zw3N4IAyXz4I1LwvPL0ggClmi1us/L0bXABeCJWEYAgIW6VW1n0WzCYyAHPAUEz9EPiMXEueIAQWfSGb6UgllAj1wEwWJZsIW0ybQHikIroWz4+iBDOEL0QrBCbEIoQiRBXEEYQNUQwEi4UFSUAnIIAkA0hwgDy9HhWEiKgJBA2AYAgIW6VW1n0WzCYyAHPAUEz9EPiAqQBEREBA6B4VhACERKAEEEz9HxvpSCWUCPXATBYlmwhbTJtAeIQNABSAAAAAEVsaW1pbmF0aW9uIHRpbWVzdGFtcHMgaGF2ZSBiZWVuIHNldCEE0DDbPDKCAMsO+CN4KaUrWYAgQTP0Dm+hlAHXATCSW23iIG7y0IC+8vQneHCAIEEz9A5voZQB1wEwkltt4iBu8tCAbXBwLIrkMDL4J28Q+EFvJBNfA6EmoSB6qQRmoSOpBHAkiuQwf4BCLhcbHQPcLoAQIln0D2+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH1lsEm8C4iBu8tCAbyJwLniAIFn0hm+lIJZQI9cBMFiWbCFtMm0B4pCK6BAjXwNTBbzjDwOkQTAYGRoASFMwvpEykTDieFYQAoAgQTP0fG+lIJZQI9cBMFiWbCFtMm0B4gAwbDNtgBBYcFAEIG6VMFn0WzCUQTP0FuJxAD4luo4WE4AQUjIgbpUwWfRbMJRBM/QW4gGkWJEw4lUgAkQjgBAiWfQOb6GSMG3fIG7y0IB/coglVSAQJBAjbW3bPDCkHDAAdgAAAABDb25ncmF0dWxhdGlvbnMhIFlvdSBhcmUgdGhlIHdpbm5lciEgSGVyZSdzIHlvdXIgc2hhcmUhBDKIVhMEBVUgECQQI21t2zwwInAEiuRsMUupHjAfIQA4AAAAAENvbW1pc3Npb24gZm9yIHRoZSBnYW1lIQH8IoAQJVn0Dm+hkjBt3yBu8tCAJYEBCyJZ9AtvoZIwbd8gbpIwbY4Q0IEBAdcAgQEB1wBZbBJvAuJwICJus5lbIG7y0IBvIgGRMuKkURSgAYEBCwLIWQKBAQHPAIEBAc8AySIQOAEgbpUwWfRZMJRBM/QT4gakBKQXgQELVBBjIAA0gQEBIW6VW1n0WTCYyAHPAEEz9EHiBhA1EDQEINs8UIfbPIgQPBCbEIpJgBMiIyQlAApfA21tcAAGW21wACoAAAAAR2FtZSBpcyBmaW5pc2hlZCEBDvhCAX9t2zwvA2ww0x8BghAHEEsduvLggdN/ATFV0Ns8NogQ3hDNELwQqxCaEIkQeBBWEEUQNEEw+EIBf23bPH8uJy8AKgAAAABFbnRyeSBmZWUgaXMgc2V0IQSSj74w0x8BghDyD97FuvLggdMHATFV0Ns8NYF6Fy7BGvL0iBDeEM0QvBCrEJoQiRB4EGcQRRA0QTD4QgF/bds8f+AgghDt7+VPui4pLyoAKgAAAABDb21pc3Npb24gaXMgc2V0IQSej8Qw0x8BghDt7+VPuvLggdN/ATFV0Ns8NIIAqlQughA7msoAvvL0iBDeEM0QvBCrEJoQiRB4EGcQVhA0QTD4QgF/bds8f+AgghCUapi2ui4rLywANgAAAABUb24gZm9yIHN0b3JhZ2UgaXMgc2V0IQLQjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4IIQgZ2+mbqOsdMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLgMHAvLQKoVdHbPD1R7chZghAyeytKUAPLH8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQ3hC9EKwQmxCKEHkQaBBXEEYQNUQwEvhCAX9t2zx/Li8AEvhCUuDHBfLghAE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwMAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgxAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAN7I+EMBzH8BygBV0FDtINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WG8sfyEoTUJhQI/QA9ACBAQHPAEBDAvQAgQEBzwDLf8sHgQEBzwDIQDQC9ACBAQHPAEBDAvQAgQEBzwDJWMzJAczJ7VQCASA0SAIBIDU+AgFINjoCAUg3OQIQqybbPNs8bOFoOAACKAIQqI/bPNs8bOFobQIDlRA7PAJLsWQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qhu2eNnDBodAIPsztnm2eNnDBoPQACKwIBID9EAgEgQEICEbFHds82zxs4YGhBAAItAhGwp3bPNs8bOGBoQwACIwIByUVHAkuiXINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQ3bPGzhmhGAQ5UbMBSwNs8dQJLo7CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUN2zxs4ZocgIBIEliAgEgSlsCASBLUAIBIExOAhGv/m2ebZ42cMBoTQEIJHnbPFUCEaw/7Z5tnjZwwGhPAQgmeds8VQIBIFFWAgFYUlMCD6c/tnm2eNnDaG4CD6WBtnm2eNnDaFQBDvgnbxB52zxVANogwQEhwk2x8tCGyCLBAJiALQHLBwKjAt5/cG8ABI4bBHqpDCDAAFIwsLObcDOmMBRvjASkBAORMOIE5AGzlwKALm+MAqTejhADeqkMpjATb4wDpCLAABA05jMipQOaUxJvgQHLBwKlAuRsIcnQAgFqV1kCD6OnbPNs8bOGaFgAAicCD6JDbPNs8bOGaFoAAiwCAVhcYQIBWF1fAg+lgbZ5tnjZw2heAAIpAg+lybZ5tnjZw2hgAAIlAhGtf22ebZ42cMBobAIBIGNnAgFiZGUAEKq+7UTQ0gABAhCp5ds82zxs4WhmAAIhAlG0KaQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qhu2eNl22HcGhrAfbtRNDUAfhj0gABjmb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf1AHQ9AT0BIEBAdcAVSAD9ASBAQHXAFkC03/TB4EBAdcA1DDQ9ASBAQHXAFkC9ASBAQHXAFkyEM4QzRCrEJoQeEMAbB7g+CjXCwqDCbppARry4ImBAQHXAAEB0ds8agA+bW1wbXD4QoIQO5rKAHohbXBtcBB9EHwQexB6EHkQeATCVHZ5DRERDQwREAwQvxCuCRERCQgREAgQfxBuBRERBQQREAQQPxAuARERAREQ2zxV0Ns8KlXR2zxTQg0REA0QzxC+ChEQChCfEI4HERAHEG8QXgQREAQQPxAuAREQAQ9WFWxtbnEAzifAAJF/jhUoeHCAIEEz9A5voZQB1wEwkltt4m7ikW3gcCl4IoAgQTP0Dm+hlAHXATCSW23iIG7y0ICd+CMhvpUppVIguZFw4o4bMKQpeCKAIEEz9A5voZQB1wEwkltt4iBu8tCA6DEAyifAAJF/jhUoeHCAIEEz9A5voZQB1wEwkltt4m7ikW3gcCl4IoAgQTP0Dm+hlAHXATCSW23iIG7y0ICd+CMBvpUopVIQuZFw4o4apCl4IoAgQTP0Dm+hlAHXATCSW23iIG7y0IDoAQxwUwqK5DBvAvwtgBAiWfQPb6GSMG3fIG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMfWWwSbwLiIG7y0IBvIjAOERAOXjwQvwoREAoQnwgREAgQfwYREAYQXwQREAQQPwIREAIf2zx/IW6SW3CRuuKTD6QP3g6kEN90cAAsEM4QvRCsEJsQihB5EGgQVxBGEDVEMAKw2zwRFts8ChEVCgkRGAkIERcIBxEUBwYREwYFERIFEE8DEREDAhEQAgERFgEOERgODREXDQwRFgwLERULCxEUCw4REw4NERINCxERCw4REA4Q3xDeEL0QvHJ0AuwrgQELIoAQQTP0Cm+hlAHXATCSW23ibpIwbeBwKngigCBBM/QOb6GUAdcBMJJbbeIgbvLQgJ34IwG+lSmlUhC5kXDijhqkKngigCBBM/QOb6GUAdcBMJJbbeIgbvLQgOggwACSW3/gVG3QUtTbPHgCpVRLM4AgdXMAMkEz9A5voZQB1wEwkltt4iBu8tCAvpF/4HAC9iuBAQsigBBBM/QKb6GUAdcBMJJbbeJukjBt4HAqeCKAIEEz9A5voZQB1wEwkltt4iBu8tCAnfgjIb6VKqVSILmRcOKOGzCkKngigCBBM/QOb6GUAdcBMJJbbeIgbvLQgOghwACRf5MhwAHik18Df+BUbuBS5ds8eCKlLXV2AOCBGyMCwgAS8vSBAQsBgBBBM/QKb6GUAdcBMJJbbeKCAMFwIW6z8vSAEAEgbvLQgFn0D2+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH1lsEm8C4iBu8tCAbyIxAKBZgCBBM/QOb6GUAdcBMJJbbeIgbvLQgHgjpv4uWYAgQTP0Dm+hlAHXATCSW23iIG7y0IAspRS6lfgjUAS+kjNw4pcxAb6Rf+Bw4DK+kX/gcEn6bFg='
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initTokenRoyale_init_args({ $$type: 'TokenRoyale_init_args', id })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const TokenRoyale_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: {
    message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
  },
  50: { message: `Account state size exceeded limits` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  6947: { message: `No items in the array!` },
  11552: { message: `Insuffucient amount to join the game!` },
  17012: { message: `Address already exists in participants list!` },
  22767: { message: `Elimination timestamps have not been set yet!` },
  25989: { message: `You have already checked in for this round!` },
  31255: { message: `Commission must be less than or equal to 25%!` },
  35378: { message: `Game is in progress or finished!` },
  36877: { message: `Round duration must be greater than 0!` },
  40842: { message: `You failed to check in on time!` },
  41817: { message: `Limit of participants reached!` },
  42394: { message: `At least one round duration must be set!` },
  43604: { message: `TON for storage must be greater than or equal to 5 TON!` },
  49520: { message: `Address not found in participants list!` },
  51580: { message: `Start timestamp must be set in the future!` },
  51846: { message: `Game has ended!` },
  51982: { message: `Game has not ended yet!` },
  60434: { message: `Game has not started yet!` },
};

const TokenRoyale_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'StdAddress',
    header: null,
    fields: [
      {
        name: 'workchain',
        type: { kind: 'simple', type: 'int', optional: false, format: 8 },
      },
      {
        name: 'address',
        type: { kind: 'simple', type: 'uint', optional: false, format: 256 },
      },
    ],
  },
  {
    name: 'VarAddress',
    header: null,
    fields: [
      {
        name: 'workchain',
        type: { kind: 'simple', type: 'int', optional: false, format: 32 },
      },
      {
        name: 'address',
        type: { kind: 'simple', type: 'slice', optional: false },
      },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      {
        name: 'bounced',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'sender',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      {
        name: 'bounce',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'to',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'mode',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'ChangeOwner',
    header: 2174598809,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeOwnerOk',
    header: 846932810,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'Deploy',
    header: 2490013878,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'cashback',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  { name: 'Join', header: 827933329, fields: [] },
  { name: 'CheckIn', header: 928085272, fields: [] },
  {
    name: 'SetEliminationTimestamps',
    header: 996966737,
    fields: [
      {
        name: 'startTimestamp',
        type: { kind: 'simple', type: 'uint', optional: false, format: 32 },
      },
      {
        name: 'roundDurations',
        type: {
          kind: 'dict',
          key: 'uint',
          keyFormat: 8,
          value: 'uint',
          valueFormat: 16,
        },
      },
    ],
  },
  { name: 'CompleteTheGame', header: 2550845504, fields: [] },
  { name: 'PayRent', header: 3044184736, fields: [] },
  {
    name: 'SetEntryFee',
    header: 118508317,
    fields: [
      {
        name: 'entryFee',
        type: { kind: 'simple', type: 'uint', optional: false, format: 128 },
      },
    ],
  },
  {
    name: 'SetCommission',
    header: 4061126341,
    fields: [
      {
        name: 'commission',
        type: { kind: 'simple', type: 'uint', optional: false, format: 8 },
      },
    ],
  },
  {
    name: 'SetTonForStorage',
    header: 3991921999,
    fields: [
      {
        name: 'tonForStorage',
        type: { kind: 'simple', type: 'uint', optional: false, format: 128 },
      },
    ],
  },
  {
    name: 'Participant',
    header: null,
    fields: [
      {
        name: 'address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'lastCheckInTime',
        type: { kind: 'simple', type: 'uint', optional: false, format: 32 },
      },
    ],
  },
  {
    name: 'IterableParticipantMap',
    header: null,
    fields: [
      {
        name: 'm',
        type: {
          kind: 'dict',
          key: 'uint',
          keyFormat: 16,
          value: 'Participant',
          valueFormat: 'ref',
        },
      },
      {
        name: 'index',
        type: { kind: 'dict', key: 'address', value: 'uint', valueFormat: 16 },
      },
      {
        name: 'length',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'EliminationTimestampsMap',
    header: null,
    fields: [
      {
        name: 'm',
        type: {
          kind: 'dict',
          key: 'uint',
          keyFormat: 8,
          value: 'uint',
          valueFormat: 32,
        },
      },
      {
        name: 'length',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'WinnersMap',
    header: null,
    fields: [
      {
        name: 'm',
        type: { kind: 'dict', key: 'uint', keyFormat: 16, value: 'address' },
      },
      {
        name: 'length',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'LastGameWinnersMap',
    header: null,
    fields: [
      { name: 'm', type: { kind: 'dict', key: 'address', value: 'int' } },
      {
        name: 'length',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'ParticipantsWinnings',
    header: null,
    fields: [
      {
        name: 'count',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'totalAmount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'AllTimeWinnersMap',
    header: null,
    fields: [
      {
        name: 'm',
        type: {
          kind: 'dict',
          key: 'address',
          value: 'ParticipantsWinnings',
          valueFormat: 'ref',
        },
      },
      {
        name: 'length',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'GameState',
    header: null,
    fields: [
      {
        name: 'comission',
        type: { kind: 'simple', type: 'uint', optional: false, format: 8 },
      },
      {
        name: 'entryFee',
        type: { kind: 'simple', type: 'uint', optional: false, format: 128 },
      },
      {
        name: 'eliminationTimestamps',
        type: {
          kind: 'dict',
          key: 'uint',
          keyFormat: 8,
          value: 'uint',
          valueFormat: 32,
        },
      },
      {
        name: 'upcomingEliminationTimestamp',
        type: { kind: 'simple', type: 'uint', optional: true, format: 32 },
      },
      {
        name: 'currentRound',
        type: { kind: 'simple', type: 'uint', optional: true, format: 8 },
      },
      {
        name: 'amountOfParticipants',
        type: { kind: 'simple', type: 'uint', optional: false, format: 16 },
      },
      {
        name: 'amountOfRemainingParticipants',
        type: { kind: 'simple', type: 'uint', optional: true, format: 16 },
      },
      {
        name: 'lastGameWinners',
        type: { kind: 'dict', key: 'address', value: 'int' },
      },
      {
        name: 'allTimeWinners',
        type: {
          kind: 'dict',
          key: 'address',
          value: 'ParticipantsWinnings',
          valueFormat: 'ref',
        },
      },
      {
        name: 'hasCheckedInThisRound',
        type: { kind: 'simple', type: 'bool', optional: true },
      },
      {
        name: 'isStillInGame',
        type: { kind: 'simple', type: 'bool', optional: true },
      },
    ],
  },
  {
    name: 'TokenRoyale$Data',
    header: null,
    fields: [
      {
        name: 'owner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 32 },
      },
      {
        name: 'participants',
        type: {
          kind: 'simple',
          type: 'IterableParticipantMap',
          optional: false,
        },
      },
      {
        name: 'eliminationTimestamps',
        type: {
          kind: 'simple',
          type: 'EliminationTimestampsMap',
          optional: false,
        },
      },
      {
        name: 'entryFee',
        type: { kind: 'simple', type: 'uint', optional: false, format: 128 },
      },
      {
        name: 'comission',
        type: { kind: 'simple', type: 'uint', optional: false, format: 8 },
      },
      {
        name: 'tonForStorage',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'lastGameWinners',
        type: { kind: 'simple', type: 'LastGameWinnersMap', optional: false },
      },
      {
        name: 'allTimeWinners',
        type: { kind: 'simple', type: 'AllTimeWinnersMap', optional: false },
      },
    ],
  },
];

const TokenRoyale_getters: ABIGetter[] = [
  {
    name: 'id',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'participantLastCheckIn',
    arguments: [
      {
        name: 'address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'isParticipantStillInGame',
    arguments: [
      {
        name: 'address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'bool', optional: true },
  },
  {
    name: 'hasParticipantCheckedInThisRound',
    arguments: [
      {
        name: 'address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'bool', optional: true },
  },
  {
    name: 'amountOfParticipants',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'remainingParticipants',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'eliminationTimestamps',
    arguments: [],
    returnType: {
      kind: 'dict',
      key: 'uint',
      keyFormat: 8,
      value: 'uint',
      valueFormat: 32,
    },
  },
  {
    name: 'eliminationTimestampsLength',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'upcomingEliminationTime',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: true, format: 257 },
  },
  {
    name: 'currentRound',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: true, format: 257 },
  },
  {
    name: 'entryFee',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'commission',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'tonForStorage',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'participants',
    arguments: [],
    returnType: {
      kind: 'dict',
      key: 'uint',
      keyFormat: 16,
      value: 'Participant',
      valueFormat: 'ref',
    },
  },
  {
    name: 'lastGameWinners',
    arguments: [],
    returnType: { kind: 'dict', key: 'address', value: 'int' },
  },
  {
    name: 'allTimeWinners',
    arguments: [],
    returnType: {
      kind: 'dict',
      key: 'address',
      value: 'ParticipantsWinnings',
      valueFormat: 'ref',
    },
  },
  {
    name: 'balance',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'gameState',
    arguments: [
      {
        name: 'address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'GameState', optional: false },
  },
  {
    name: 'owner',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
];

export const TokenRoyale_getterMapping: { [key: string]: string } = {
  id: 'getId',
  participantLastCheckIn: 'getParticipantLastCheckIn',
  isParticipantStillInGame: 'getIsParticipantStillInGame',
  hasParticipantCheckedInThisRound: 'getHasParticipantCheckedInThisRound',
  amountOfParticipants: 'getAmountOfParticipants',
  remainingParticipants: 'getRemainingParticipants',
  eliminationTimestamps: 'getEliminationTimestamps',
  eliminationTimestampsLength: 'getEliminationTimestampsLength',
  upcomingEliminationTime: 'getUpcomingEliminationTime',
  currentRound: 'getCurrentRound',
  entryFee: 'getEntryFee',
  commission: 'getCommission',
  tonForStorage: 'getTonForStorage',
  participants: 'getParticipants',
  lastGameWinners: 'getLastGameWinners',
  allTimeWinners: 'getAllTimeWinners',
  balance: 'getBalance',
  gameState: 'getGameState',
  owner: 'getOwner',
};

const TokenRoyale_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'Join' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'CheckIn' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'PayRent' } },
  {
    receiver: 'internal',
    message: { kind: 'typed', type: 'SetEliminationTimestamps' },
  },
  { receiver: 'internal', message: { kind: 'typed', type: 'CompleteTheGame' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetEntryFee' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetCommission' } },
  {
    receiver: 'internal',
    message: { kind: 'typed', type: 'SetTonForStorage' },
  },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeOwner' } },
];

export class TokenRoyale implements Contract {
  static async init(id: bigint) {
    return await TokenRoyale_init(id);
  }

  static async fromInit(id: bigint) {
    const init = await TokenRoyale_init(id);
    const address = contractAddress(0, init);
    return new TokenRoyale(address, init);
  }

  static fromAddress(address: Address) {
    return new TokenRoyale(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: TokenRoyale_types,
    getters: TokenRoyale_getters,
    receivers: TokenRoyale_receivers,
    errors: TokenRoyale_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | Join
      | CheckIn
      | PayRent
      | SetEliminationTimestamps
      | CompleteTheGame
      | SetEntryFee
      | SetCommission
      | SetTonForStorage
      | Deploy
      | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Join'
    ) {
      body = beginCell().store(storeJoin(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'CheckIn'
    ) {
      body = beginCell().store(storeCheckIn(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'PayRent'
    ) {
      body = beginCell().store(storePayRent(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetEliminationTimestamps'
    ) {
      body = beginCell()
        .store(storeSetEliminationTimestamps(message))
        .endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'CompleteTheGame'
    ) {
      body = beginCell().store(storeCompleteTheGame(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetEntryFee'
    ) {
      body = beginCell().store(storeSetEntryFee(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetCommission'
    ) {
      body = beginCell().store(storeSetCommission(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetTonForStorage'
    ) {
      body = beginCell().store(storeSetTonForStorage(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Deploy'
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ChangeOwner'
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getId(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('id', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getParticipantLastCheckIn(
    provider: ContractProvider,
    address: Address
  ) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    let source = (await provider.get('participantLastCheckIn', builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getIsParticipantStillInGame(
    provider: ContractProvider,
    address: Address
  ) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    let source = (
      await provider.get('isParticipantStillInGame', builder.build())
    ).stack;
    let result = source.readBooleanOpt();
    return result;
  }

  async getHasParticipantCheckedInThisRound(
    provider: ContractProvider,
    address: Address
  ) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    let source = (
      await provider.get('hasParticipantCheckedInThisRound', builder.build())
    ).stack;
    let result = source.readBooleanOpt();
    return result;
  }

  async getAmountOfParticipants(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('amountOfParticipants', builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getRemainingParticipants(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('remainingParticipants', builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getEliminationTimestamps(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('eliminationTimestamps', builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Uint(8),
      Dictionary.Values.Uint(32),
      source.readCellOpt()
    );
    return result;
  }

  async getEliminationTimestampsLength(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (
      await provider.get('eliminationTimestampsLength', builder.build())
    ).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getUpcomingEliminationTime(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (
      await provider.get('upcomingEliminationTime', builder.build())
    ).stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getCurrentRound(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('currentRound', builder.build())).stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getEntryFee(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('entryFee', builder.build())).stack;
    let result = source.readString();
    return result;
  }

  async getCommission(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('commission', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getTonForStorage(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('tonForStorage', builder.build())).stack;
    let result = source.readString();
    return result;
  }

  async getParticipants(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('participants', builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Uint(16),
      dictValueParserParticipant(),
      source.readCellOpt()
    );
    return result;
  }

  async getLastGameWinners(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('lastGameWinners', builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257),
      source.readCellOpt()
    );
    return result;
  }

  async getAllTimeWinners(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('allTimeWinners', builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      dictValueParserParticipantsWinnings(),
      source.readCellOpt()
    );
    return result;
  }

  async getBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('balance', builder.build())).stack;
    let result = source.readString();
    return result;
  }

  async getGameState(provider: ContractProvider, address: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    let source = (await provider.get('gameState', builder.build())).stack;
    const result = loadGetterTupleGameState(source);
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('owner', builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}

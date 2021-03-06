/* eslint-disable camelcase */

'use strict';

const client = ({ person_id }) => {
  const { name, email: emails, phone: phones } = person_id;
  const email = emails.find((mail) => mail.value.length > 0);
  const phone = phones.find((phoneNumber) => phoneNumber.value.length > 0);

  return {
    nome: name,
    email: email ? email.value : undefined,
    fone: phone ? phone.value : undefined,
  };
};

const bulk = () => {
  return [
    {
      volume: {
        servico: 'LINKAPI',
      },
    },
  ];
};

const carriage = () => {
  const volumes = bulk();
  return {
    volumes,
  };
};

const installments = (deal) => {
  const { value } = deal;
  return [
    {
      parcela: {
        vlr: value,
        dias: 3,
      },
    },
  ];
};

const items = (deal) => {
  if (!deal.items) {
    return [
      {
        item: {
          descricao: deal.title,
          vlr_unit: deal.value,
          codigo: Math.random(),
        },
      },
    ];
  }

  return deal.items.map((item) => {
    const { product } = item;
    return {
      item: {
        codigo: product.code,
        descricao: item.name,
        qntde: item.quantity,
        vlr_unit: item.item_price,
      },
    };
  });
};

const transformerOrder = (deal) => {
  const cliente = client(deal);
  const transporte = carriage();
  const parcelas = installments(deal);
  const itens = items(deal);

  return {
    pedido: {
      cliente,
      transporte,
      parcelas,
      itens,
    },
  };
};

module.exports = transformerOrder;
